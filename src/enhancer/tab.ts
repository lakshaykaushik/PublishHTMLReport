import Controls = require("VSS/Controls");
import VSS_Service = require("VSS/Service");
import TFS_Build_Contracts = require("TFS/Build/Contracts");
import TFS_Build_Extension_Contracts = require("TFS/Build/ExtensionContracts");
import DT_Client = require("TFS/DistributedTask/TaskRestClient");
import { data } from "jquery";
import scriptFiles from "../../publishhtmlreport/scriptFiles"

export class InfoTab extends Controls.BaseControl {
	constructor() {
		super();
	}

	public initialize(): void {
		super.initialize();
		// Get configuration that's shared between extension and the extension host
		var sharedConfig: TFS_Build_Extension_Contracts.IBuildResultsViewExtensionConfig = VSS.getConfiguration();
		var vsoContext = VSS.getWebContext();
		if (sharedConfig) {
			// register your extension with host through callback
			sharedConfig.onBuildChanged((build: TFS_Build_Contracts.Build): void => {
				this._initBuildInfo(build);

				const taskClient = DT_Client.getClient();
				
				scriptFiles.forEach((item: string) => {
					this.insertScript(taskClient, vsoContext, build, `pub_${item}`, `pub_${item}`);
				})

				taskClient.getPlanAttachments(vsoContext.project.id, "build", build.orchestrationPlan.planId, "replacedhtml").then((taskAttachments) => {
					$.each(taskAttachments, (index, taskAttachment) => {
						if (taskAttachment._links && taskAttachment._links.self && taskAttachment._links.self.href) {

							var recId = taskAttachment.recordId;
							var timelineId = taskAttachment.timelineId;

							taskClient.getAttachmentContent(vsoContext.project.id, "build", build.orchestrationPlan.planId, timelineId, recId, "replacedhtml", taskAttachment.name).then((attachementContent) => {
								var newhtml = this.arrayBufferToString(attachementContent);
								document.body.style.overflow = "visible";
								document.getElementById("wrapper").innerHTML = newhtml
							});
						}
					});
				});
			});
		}
	}

	private _initBuildInfo(build: TFS_Build_Contracts.Build) {

	}

	private arrayBufferToString(buffer: ArrayBuffer): string {
		let newstring = '';
		const arr = new Uint8Array(buffer);
		const len = arr.byteLength;
		for (var i = 0; i < len; i++) {
			newstring += String.fromCharCode(arr[i]);
		}
		return newstring;
	}
	private insertScript(taskClient: DT_Client.TaskHttpClient4, vsoContext: WebContext, build: TFS_Build_Contracts.Build, scriptName: string, scriptElementName: string) {
		taskClient.getPlanAttachments(vsoContext.project.id, "build", build.orchestrationPlan.planId, scriptName).then((taskAttachments) => {
			$.each(taskAttachments, (index, taskAttachment) => {
				if (taskAttachment._links && taskAttachment._links.self && taskAttachment._links.self.href) {
					var recId = taskAttachment.recordId;
					var timelineId = taskAttachment.timelineId;

					taskClient.getAttachmentContent(vsoContext.project.id, "build", build.orchestrationPlan.planId, timelineId, recId, scriptName, taskAttachment.name).then((attachmentContent) => {
						var content = this.arrayBufferToString(attachmentContent);
				
						var scriptElement = document.getElementById(scriptElementName)
						document.body.style.overflow = "visible";
						
						if (scriptElement) {
							var children = document.getElementById(scriptElementName).childNodes;
							for (let i = 0; i < children.length; i++) {
								document.getElementById(scriptElementName).childNodes[i].remove();
							}
							var s = document.createElement("script");
							s.innerHTML = content
							s.async = false

							document.getElementById(scriptElementName).appendChild(s)
						}
					})
				}
			})
		})
	}
}

InfoTab.enhance(InfoTab, $(".wrapper"), {});

// Notify the parent frame that the host has been loaded
VSS.notifyLoadSucceeded();
