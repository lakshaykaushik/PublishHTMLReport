import tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
        const inputString: string | undefined = tl.getInput('htmlType', true);
        if (inputString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        

        if (inputString == 'Jmeter') {
        const jmeterPath: string | undefined = tl.getInput('JmeterReportsPath', false);
        console.log('##vso[task.addattachment type=firstscriptname;name=content;]' + jmeterPath! + '/content/js/' + 'dashboard-commons.js');
        console.log('##vso[task.addattachment type=secondscriptname;name=content;]' + jmeterPath! + '/content/js/' + 'dashboard.js');
        console.log('##vso[task.addattachment type=thirdscriptname;name=content;]' + jmeterPath! + '/content/js/' + 'jquery.tablesorter.min.js');
        console.log('##vso[task.addattachment type=fourthscriptname;name=content;]' + jmeterPath! + '/content/js/' + 'jquery.flot.stack.js');
        console.log('##vso[task.addattachment type=fifthscriptname;name=content;]' + jmeterPath! + '/content/js/' + 'hashtable.js');
        console.log('##vso[task.addattachment type=sixthscriptname;name=content;]' + jmeterPath! + '/content/js/' + 'jquery.numberformatter-1.2.3.min.js');
        console.log('##vso[task.addattachment type=seventhscriptname;name=content;]' + jmeterPath! + '/content/js/' + 'curvedLines.js');
        console.log('##vso[task.addattachment type=ninthscriptname;name=content;]' + jmeterPath! + '/content/js/' + 'graph.js');
        console.log('##vso[task.addattachment type=tenthscriptname;name=content;]' + jmeterPath! + '/content/js/' + 'jquery-ui.min.js');
        console.log('##vso[task.addattachment type=eleventhscriptname;name=content;]' + jmeterPath! + '/content/js/' + 'jquery.cookie.js');
        console.log('##vso[task.addattachment type=twefthscriptname;name=content;]' + jmeterPath! + '/content/js/' + 'customGraph.js');

    }
    if (inputString == 'genericHTML'){
        const newhtmlPath: string | undefined = tl.getInput('htmlPath', false);
        console.log('##vso[task.addattachment type=replacedhtml;name=content;]' + newhtmlPath!);
    }
}
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();