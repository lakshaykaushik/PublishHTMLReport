import Controls = require("VSS/Controls");
import VSS_Service = require("VSS/Service");
import TFS_Build_Contracts = require("TFS/Build/Contracts");
import TFS_Build_Extension_Contracts = require("TFS/Build/ExtensionContracts");
import DT_Client = require("TFS/DistributedTask/TaskRestClient");
import { data } from "jquery";

export class InfoTab extends Controls.BaseControl {	
	constructor() {
		super();
	}
		
	public initialize(): void {
		super.initialize();
		// Get configuration that's shared between extension and the extension host
		var sharedConfig: TFS_Build_Extension_Contracts.IBuildResultsViewExtensionConfig = VSS.getConfiguration();
		var vsoContext = VSS.getWebContext();
		if(sharedConfig) {
			// register your extension with host through callback
			sharedConfig.onBuildChanged((build: TFS_Build_Contracts.Build) => {
				this._initBuildInfo(build);	
				
					 var taskClient = DT_Client.getClient();
					 taskClient.getPlanAttachments(vsoContext.project.id, "build", build.orchestrationPlan.planId, "firstscriptname").then((taskAttachments)=> {
					 	$.each(taskAttachments, (index, taskAttachment) => {
					 		if (taskAttachment._links && taskAttachment._links.self && taskAttachment._links.self.href) {

								var recId = taskAttachment.recordId;
								var timelineId = taskAttachment.timelineId;
								
								taskClient.getAttachmentContent(vsoContext.project.id, "build", build.orchestrationPlan.planId,timelineId,recId,"firstscriptname",taskAttachment.name).then((attachementContent)=> {
									function arrayBufferToString(buffer){
										var arr = new Uint8Array(buffer);
										var str = String.fromCharCode.apply(String, arr);
										return str;
									}
									var first = arrayBufferToString(attachementContent);
									document.body.style.overflow = "visible";
									
									var s = document.createElement("script");
									s.innerHTML = first;
									s.async = false;
									
									//s.type = "text/javascript";
									document.getElementById("firstscript").appendChild(s)
								});
								
								
					 		}
					 	});
					 });
					 taskClient.getPlanAttachments(vsoContext.project.id, "build", build.orchestrationPlan.planId, "secondscriptname").then((taskAttachments)=> {
						$.each(taskAttachments, (index, taskAttachment) => {
							if (taskAttachment._links && taskAttachment._links.self && taskAttachment._links.self.href) {

							   var recId = taskAttachment.recordId;
							   var timelineId = taskAttachment.timelineId;
							   
							   taskClient.getAttachmentContent(vsoContext.project.id, "build", build.orchestrationPlan.planId,timelineId,recId,"secondscriptname",taskAttachment.name).then((attachementContent)=> {
								   function arrayBufferToString(buffer){
									   var arr = new Uint8Array(buffer);
									   var str = String.fromCharCode.apply(String, arr);
									   return str;
								   }
								   var second = arrayBufferToString(attachementContent);
								   
									var s = document.createElement("script");
									s.innerHTML = second;
									s.async = false;
                                    document.getElementById("secondscript").appendChild(s)
							   
							});
							   
							}
						});
					});
					taskClient.getPlanAttachments(vsoContext.project.id, "build", build.orchestrationPlan.planId, "fourthscriptname").then((taskAttachments)=> {
						$.each(taskAttachments, (index, taskAttachment) => {
							if (taskAttachment._links && taskAttachment._links.self && taskAttachment._links.self.href) {

							   var recId = taskAttachment.recordId;
							   var timelineId = taskAttachment.timelineId;
							   
							   taskClient.getAttachmentContent(vsoContext.project.id, "build", build.orchestrationPlan.planId,timelineId,recId,"fourthscriptname",taskAttachment.name).then((attachementContent)=> {
								   function arrayBufferToString(buffer){
									   var arr = new Uint8Array(buffer);
									   var str = String.fromCharCode.apply(String, arr);
									   return str;
								   }
								   var fourth = arrayBufferToString(attachementContent);
								   
									var s = document.createElement("script");
									s.innerHTML = fourth;
									s.async = false;
                                    document.getElementById("fourthscript").appendChild(s)
							   
							});
							   
							}
						});
					});
					taskClient.getPlanAttachments(vsoContext.project.id, "build", build.orchestrationPlan.planId, "fifthscriptname").then((taskAttachments)=> {
						$.each(taskAttachments, (index, taskAttachment) => {
							if (taskAttachment._links && taskAttachment._links.self && taskAttachment._links.self.href) {

							   var recId = taskAttachment.recordId;
							   var timelineId = taskAttachment.timelineId;
							   
							   taskClient.getAttachmentContent(vsoContext.project.id, "build", build.orchestrationPlan.planId,timelineId,recId,"fifthscriptname",taskAttachment.name).then((attachementContent)=> {
								   function arrayBufferToString(buffer){
									   var arr = new Uint8Array(buffer);
									   var str = String.fromCharCode.apply(String, arr);
									   return str;
								   }
								   var fifth = arrayBufferToString(attachementContent);
								   
									var s = document.createElement("script");
									s.innerHTML = fifth;
									s.async = false;
                                    document.getElementById("fifthscript").appendChild(s)
							   
							});
							   
							}
						});
					});
					taskClient.getPlanAttachments(vsoContext.project.id, "build", build.orchestrationPlan.planId, "sixthscriptname").then((taskAttachments)=> {
						$.each(taskAttachments, (index, taskAttachment) => {
							if (taskAttachment._links && taskAttachment._links.self && taskAttachment._links.self.href) {

							   var recId = taskAttachment.recordId;
							   var timelineId = taskAttachment.timelineId;
							   
							   taskClient.getAttachmentContent(vsoContext.project.id, "build", build.orchestrationPlan.planId,timelineId,recId,"sixthscriptname",taskAttachment.name).then((attachementContent)=> {
								   function arrayBufferToString(buffer){
									   var arr = new Uint8Array(buffer);
									   var str = String.fromCharCode.apply(String, arr);
									   return str;
								   }
								   var sixth = arrayBufferToString(attachementContent);
								   
									var s = document.createElement("script");
									s.innerHTML = sixth;
									s.async = false;
                                    document.getElementById("sixthscript").appendChild(s)
							   
							});
							   
							}
						});
					});
					taskClient.getPlanAttachments(vsoContext.project.id, "build", build.orchestrationPlan.planId, "seventhscriptname").then((taskAttachments)=> {
						$.each(taskAttachments, (index, taskAttachment) => {
							if (taskAttachment._links && taskAttachment._links.self && taskAttachment._links.self.href) {

							   var recId = taskAttachment.recordId;
							   var timelineId = taskAttachment.timelineId;
							   
							   taskClient.getAttachmentContent(vsoContext.project.id, "build", build.orchestrationPlan.planId,timelineId,recId,"seventhscriptname",taskAttachment.name).then((attachementContent)=> {
								   function arrayBufferToString(buffer){
									   var arr = new Uint8Array(buffer);
									   var str = String.fromCharCode.apply(String, arr);
									   return str;
								   }
								   var seventh = arrayBufferToString(attachementContent);
								   
									var s = document.createElement("script");
									s.innerHTML = seventh;
									s.async = false;
                                    document.getElementById("seventhscript").appendChild(s)
							   
							});
							   
							}
						});
					});
					taskClient.getPlanAttachments(vsoContext.project.id, "build", build.orchestrationPlan.planId, "ninthscriptname").then((taskAttachments)=> {
						$.each(taskAttachments, (index, taskAttachment) => {
							if (taskAttachment._links && taskAttachment._links.self && taskAttachment._links.self.href) {

							   var recId = taskAttachment.recordId;
							   var timelineId = taskAttachment.timelineId;
							   
							   taskClient.getAttachmentContent(vsoContext.project.id, "build", build.orchestrationPlan.planId,timelineId,recId,"ninthscriptname",taskAttachment.name).then((attachementContent)=> {
								   function arrayBufferToString(buffer){
									   var newstring = '';
									   var arr = new Uint8Array(buffer);
									   var len = arr.byteLength;
									   for (var i = 0; i < len; i++) {
										newstring += String.fromCharCode( arr[ i ] );
									}
									   //var str = String.fromCharCode.apply(String, arr);
									   return newstring;
								   }
								   var ninth = arrayBufferToString(attachementContent);
								   
									var s = document.createElement("script");
									s.innerHTML = ninth;
									s.async = false;
                                    document.getElementById("ninthscript").appendChild(s)
							   
							});
							   
							}
						});
					});
					taskClient.getPlanAttachments(vsoContext.project.id, "build", build.orchestrationPlan.planId, "tenthscriptname").then((taskAttachments)=> {
						$.each(taskAttachments, (index, taskAttachment) => {
							if (taskAttachment._links && taskAttachment._links.self && taskAttachment._links.self.href) {

							   var recId = taskAttachment.recordId;
							   var timelineId = taskAttachment.timelineId;
							   
							   taskClient.getAttachmentContent(vsoContext.project.id, "build", build.orchestrationPlan.planId,timelineId,recId,"tenthscriptname",taskAttachment.name).then((attachementContent)=> {
								function arrayBufferToString(buffer){
									var newstring = '';
									var arr = new Uint8Array(buffer);
									var len = arr.byteLength;
									for (var i = 0; i < len; i++) {
									 newstring += String.fromCharCode( arr[ i ] );
								 }
									//var str = String.fromCharCode.apply(String, arr);
									return newstring;
								}
								   var tenth = arrayBufferToString(attachementContent);
								   
									var s = document.createElement("script");
									s.innerHTML = tenth;
									s.async = false;
                                    document.getElementById("tenthscript").appendChild(s)
							   
							});
							   
							}
						});
					});
					taskClient.getPlanAttachments(vsoContext.project.id, "build", build.orchestrationPlan.planId, "eleventhscriptname").then((taskAttachments)=> {
						$.each(taskAttachments, (index, taskAttachment) => {
							if (taskAttachment._links && taskAttachment._links.self && taskAttachment._links.self.href) {

							   var recId = taskAttachment.recordId;
							   var timelineId = taskAttachment.timelineId;
							   
							   taskClient.getAttachmentContent(vsoContext.project.id, "build", build.orchestrationPlan.planId,timelineId,recId,"eleventhscriptname",taskAttachment.name).then((attachementContent)=> {
								   function arrayBufferToString(buffer){
									   var arr = new Uint8Array(buffer);
									   var str = String.fromCharCode.apply(String, arr);
									   return str;
								   }
								   var eleventh = arrayBufferToString(attachementContent);
								   
									var s = document.createElement("script");
									s.innerHTML = eleventh;
									s.async = false;
                                    document.getElementById("eleventhscript").appendChild(s)
							   
							});
							   
							}
						});
					});
				
			});
		}		
	}
	
	private _initBuildInfo(build: TFS_Build_Contracts.Build) {
		
	}
}

InfoTab.enhance(InfoTab, $(".wrapper"),{});

// Notify the parent frame that the host has been loaded
VSS.notifyLoadSucceeded();

	
