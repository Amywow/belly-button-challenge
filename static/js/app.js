const url =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Fetch the JSON data and console log it
function optionChanged() {}
d3.json(url).then(function (data) {
  // Insert values into the dropdown
  let subject_id = data.names;
  for (let i = 0; i < subject_id.length; i++) {
    d3.select("#selDataset")
      .append("option")
      .text(`${subject_id[i]}`)
      .attr("value", subject_id[i]);
  }
  function init() {
    buildCharts(940);
  }
  // Define the optionChanged function
  function optionChanged() {
    let selectedSample = d3.select("#selDataset").property("value");
    buildCharts(selectedSample);
  }
  function buildCharts(sample) {
    // Find the sample with the matching ID
    let selectedSampleData = data.samples.find(
      (sampleObj) => sampleObj.id == sample
    );
    // Demographic info
    // Remove previous demographic info
    d3.select("#sample-metadata").selectAll("*").remove();
    let selectedData = data.metadata.find((sampleR) => sampleR.id == sample);
    d3.select("#sample-metadata").append("h5").text(`id: ${selectedData.id}`);
    d3.select("#sample-metadata")
      .append("p")
      .text(`ethnicity: ${selectedData.ethnicity}`);
    d3.select("#sample-metadata")
      .append("p")
      .text(`gender: ${selectedData.gender}`);
    d3.select("#sample-metadata").append("p").text(`age: ${selectedData.age}`);
    d3.select("#sample-metadata")
      .append("p")
      .text(`location: ${selectedData.location}`);
    d3.select("#sample-metadata")
      .append("p")
      .text(`bbtype: ${selectedData.bbtype}`);
    d3.select("#sample-metadata")
      .append("p")
      .text(`wfreq: ${selectedData.wfreq}`);
    // Plot the bar chart
    let topotu = selectedSampleData["otu_ids"]
      .slice(0, 10)
      .map((item) => "out" + item)
      .reverse();
    let topvalue = selectedSampleData["sample_values"].slice(0, 10).reverse();
    let toplabel = selectedSampleData["otu_labels"].slice(0, 10).reverse();
    let trace1 = {
      type: "bar",
      x: topvalue,
      y: topotu,
      text: toplabel,
      orientation: "h",
    };
    let traceData1 = [trace1];
    Plotly.newPlot("bar", traceData1);
    // Plot bubble chart
    let allotu = selectedSampleData["otu_ids"];
    let allvalue = selectedSampleData["sample_values"];
    let alllabel = selectedSampleData["otu_labels"];
    let trace2 = {
      x: allotu,
      y: allvalue,
      text: alllabel,
      mode: "markers",
      marker: {
        color: allotu,
        size: allvalue,
      },
    };
    let layout = {
      xaxis: {
        title: "OTU ID",
      },
    };
    let traceData2 = [trace2];
    Plotly.newPlot("bubble", traceData2, layout);
  }
  // Attach the optionChanged function to the change event
  d3.select("#selDataset").on("change", optionChanged);
  init();
});






   








