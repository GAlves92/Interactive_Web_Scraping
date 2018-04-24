let parameters = {
  columns : [
    {
      title: 'Date / Time',
      html: function (row) { return row.datetime; }
    },
    {
      title: 'City',
      html: function (row) { return row.city; }
    },
    {
      title: 'State',
      html: function (row) { return row.state; }
    },
    {  
      title: 'Country',
      html: function (row) { return row.country; }
    },
    {
      title: 'Shape',
      html: function (row) { return row.shape; }
    },
    {
      title: 'Durantion Minutes',
      html: function (row) { return row.durationMinutes; }
    },
    {
      title: 'Comments',
      html: function (row) { return row.comments; }
    }
  ],
  data: null,
  filtered_data: null
};
  let myD3 = d3.select('#my-d3');
  let aliensDropDown = d3.select('#dropdown');
  document.getElementById("button-user").addEventListener("click", onchange);

function loadDropDown() {
  let dropDownOptions = new Set();
  dropDownOptions.add('All');
  dropDownOptions.add('datetime');
  dropDownOptions.add('city');
  dropDownOptions.add('state');
  dropDownOptions.add('country');
  dropDownOptions.add('shape');
  
  let options =aliensDropDown
    .selectAll('option')
    .data([...dropDownOptions])
    .enter()
    .append('option')
    .attr('value', function(d) { return d;})
    .text(function(d) {return d;});
}

function onchange(event) {event.preventDefault();
  let selectValue = d3.select('#dropdown')
    .property('value');
  console.log(selectValue);
  parameters.filtered_data = [];
  for (let row of dataSet) {
    if (selectValue === 'All') {
      parameters.filtered_data.push(row);
      }
      else {console.log(d3.select('#user-input').property('value'))
        if (row[selectValue] === d3.select('#user-input').property('value'))
          parameters.filtered_data.push(row);
      }
    }
    createTables();
  }

console.log(dataSet);

init(dataSet);
function init(aliensData) {
  parameters.data = aliensData;
  parameters.filtered_data = aliensData;
  createTables(aliensData);
  loadDropDown();
}

function createTables(aliensData) {
  myD3.html('');
  let table = myD3.append('table').attr('class', 'table');

  table.append('thead').append('tr')
    .selectAll('th')
    .data(parameters['columns'])
    .enter()
    .append('th')
    .text(function (data) { return data.title; });
    console.log(parameters.filtered_data)
  table.append('tbody')
    .selectAll('tr') 
    .data(parameters.filtered_data)
    .enter()
    .append('tr')
    .selectAll('td')
    .data(function (row, i) {
      return parameters.columns.map(function (column) {
        var cell = {};
        d3.keys(column).forEach(function (k) {
          if (typeof (column[k]) === 'function') {
            cell[k] = column[k](row, i)
          }
        });
        return cell;
      });
    }).enter()
    .append('td')
    .text(function (data) { return data.html; });
  }
