const axios = require('axios');
let data = [];
const licenseKey='7db04187d9f371437237a0285684e944FFFFNRAL';
const apiKey='NRAK-0EWSWVM2VZG1ZGGVIMHIPZOWIHQ'
axios({
  method: 'get',
  url: 'https://api.newrelic.com/graphql',
  headers: {
    'Content-Type': 'application/json',
    'API-Key': apiKey
  },
  params: {
    query: '{ actor { account(id: 3724791) { nrql(query: "SELECT largestContentfulPaint, firstInputDelay, cumulativeLayoutShift, appName, browserTransactionName, firstPaint FROM PageViewTiming SINCE 1 day ago WHERE entityGuid = \'MzcyNDc5MXxCUk9XU0VSfEFQUExJQ0FUSU9OfDU5NDM5MjQ5MQ\' and appName = \'CEQ-EKART\' LIMIT MAX") { results } } } }'

  }
})
  .then(response => {
    data = response.data.data.actor.account.nrql.results;
    console.log(data);

    // Create array of metric objects
    const metrics = data.map(metric => ({
      metrics: [{
        name: 'Core Web Vitals',
        type: 'gauge',
        value: metric.largestContentfulPaint || metric.firstPaint || 0,
        timestamp: metric.timestamp,
        attributes: {
          account:"account1",
          'host.name': 'dev.server.com',
          appName: 'GraphiQL-GetPost',
          browserTransactionName: metric.browserTransactionName||"null",
          cumulativeLayoutShift: metric.cumulativeLayoutShift || "null",
          firstInputDelay: metric.firstInputDelay || "null",
          largestContentfulPaint: metric.largestContentfulPaint || "null",
          firstPaint: metric.firstPaint || "null"
        }
      }]
    }));

    // Send POST request to Metric API
    axios({
      method: 'post',
      url: 'https://metric-api.newrelic.com/metric/v1',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': licenseKey
      },
      data: metrics
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });

//Get Location


const currentTimeInEpoch = Math.floor(Date.now() / 1000);

axios({
  method: 'get',
  url: 'https://api.newrelic.com/graphql',
  headers: {
    'Content-Type': 'application/json',
    'API-Key': apiKey
  },
  params: {
    query: '{ actor { account(id: 3724791) { nrql(query: "SELECT count(*) FROM PageView WHERE entityGuid = \u0027MzcyNDc5MXxCUk9XU0VSfEFQUExJQ0FUSU9OfDU5NDM5MjQ5MQ\u0027 FACET pageUrl, city, regionCode, countryCode LIMIT MAX\") { results } } } }'

  }
})
  .then(response => {
    let data = response.data.data.actor.account.nrql.results;
    console.log(data)
// Define the metrics array

// Loop through the data and create a metric object for each item
//     // Create array of metric objects
    const metrics = data.map(metric => ({
      metrics: [{
        name: 'Core Web Vitals',
        type: 'gauge',
        value: metric.count,
        timestamp: currentTimeInEpoch,
        attributes: {
          'nameMetric': 'pageView/location',
           appName: 'GraphiQL-GetPost',
           pageUrl: metric.facet[0],
           city: metric.facet[1],
           regionCode: metric.facet[2],
           countryCode: metric.facet[3],
           count: metric.count,
           account: "account1"
        }
      }]
    }));
    

console.log(metrics)
//Send the metrics array to the New Relic Metric API using your preferred method


    //Send POST request to Metric API
    axios({
      method: 'post',
      url: 'https://metric-api.newrelic.com/metric/v1',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': licenseKey
      },
      data: metrics
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });
