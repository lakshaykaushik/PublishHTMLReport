import tl = require('azure-pipelines-task-lib/task');
import cheerio = require('cheerio');
import fs = require('fs')
import scriptFiles from './scriptFiles';

async function run() {
    try {
        const inputString: string | undefined = tl.getInput('htmlType', true);
        if (inputString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }

        if (inputString == 'Jmeter') {
            const jmeterReportsPaths: string = tl.getInput('JmeterReportsPath', false) || '';
            let allJmxFiles: string = ''
            let currentJmeterPath: string = ''
            let customScripts = '';

            for (let jmeterPath of jmeterReportsPaths.split(',')) {
                let currentJmxFile: string = '';
                
                if (!currentJmeterPath) { currentJmeterPath = jmeterPath }
                
                const $ = cheerio.load(fs.readFileSync(jmeterPath! + '/index.html'))
                $("#generalInfos > tbody > tr:nth-child(1) > td:nth-child(2)").each((_, element) => {
                    currentJmxFile = $(element).text().replace(/\"/g, "");
                    if (allJmxFiles == '') {
                        allJmxFiles = currentJmxFile;
                    } else {
                        allJmxFiles = `${allJmxFiles},${currentJmxFile}`;
                    }
                })

                if (currentJmxFile) {
                    const dashboardScript = await fs.readFileSync(jmeterPath! + '/content/js/dashboard.js').toString()
                    const graphScript = await fs.readFileSync(jmeterPath! + '/content/js/graph.js').toString()

                    customScripts = `
                        ${customScripts}
                        
                        if (currentFile == '${currentJmxFile}'.split('.')[0]) {
                            ${dashboardScript};
                            ${graphScript};
                        };`
                }
            }

            var content = `
            try {
                const jmxSelect = $('#jmxfiles')
                const allFiles = "${allJmxFiles}".split(",")
                
                jmxSelect.empty()
                jmxSelect.append(allFiles.map(item => { 
                    const jFile = item.split('.')[0]
                    return "<option value=" + jFile + ">" + jFile + "</option>"
                }))
                
                getUrlParam = function(name){
                    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href)
                    return (results && results[1]) ? results[1] : ''
                }
                
                jmxSelect.change(function() {
                    window.location.href = 'index.html?file=' + $('#jmxfiles option:selected').val()
                });
                
                const currentFile = getUrlParam("file") || $('#jmxfiles option:selected').val()
                $("#jmxfiles").val(currentFile)

                // replace all a href link with current selected jmx file
                $('#wrapper a').each(function(){
                    const currentHref = $(this).attr('href')
                    $(this).attr('href', currentHref + '?file=' + currentFile)
                })

                ${customScripts}

                $( document ).trigger( "document.ready" )

                if (allFiles.length < 2) {
                    $('#jmxfiles').attr("disabled", "disabled")
                }
            }
            catch (e) {
                console.log(e.message)
            }`
            
            // write the content to a file so that it would be added as as attachement later
            fs.writeFileSync(currentJmeterPath! + '/content/js/utils.js', content);

            scriptFiles.forEach((item: string) => {
                console.log(`##vso[task.addattachment type=pub_${item};name=content;]${currentJmeterPath!}/content/js/${item}.js`);
            })
        }
        if (inputString == 'genericHTML') {
            const newhtmlPath: string | undefined = tl.getInput('htmlPath', false);
            console.log('##vso[task.addattachment type=replacedhtml;name=content;]' + newhtmlPath!);
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();