# Publish HTML Reports
This extension can be used to publish Jmeter HTML reports as a seperate tab(Parallel to Summary tab) on Azure Devops. Right now full support of Jmeter report and any generic html report has been developed, however this extension can also be extended to publish other simple HTML documents or complex HTML reports as well. 


## Usage:

### 1. Install the below extension in your azure devops org:
https://marketplace.visualstudio.com/items?itemName=LakshayKaushik.PublishHTMLReports&targetId=c2bac9a7-71cb-49a9-84a5-acfb8db48105&utm_source=vstsproduct&utm_medium=ExtHubManageList



### 2. Run command line Jmeter with -o arg in your azure pipeline.
For e.g. jmeter -n -t TestAPI.jmx -l LoadReports\results.jtl -e -o LoadReports
This produces result files and folders having detailed jmeter report of the run.


### 3. Now, use the extension in your azure devops pipeline to publish this report on Azdo.

```
- task: publishhtmlreport@1
  inputs:
    htmlType: 'Jmeter'
    JmeterReportsPath: '$(Build.SourcesDirectory)/LoadReports'
```

This will make the Jmeter report compatible to be viewed and analysed within azure devops.

If you want to publish a simple HTML document to AZDO in a seperate tab then do the following:

```
- task: publishhtmlreport@1
  inputs:
    htmlType: 'genericHTML'
    htmlPath: '$(Build.SourcesDirectory)/Sample.html'
```
