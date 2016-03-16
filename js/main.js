//execute the script when the window loads
window.onload = function(){
  //dimensions of the svg
  var w = 900, h = 500;
//get body element from the DOM
  var container = d3.select("body")
  //append a new svg to the body
    .append("svg")
    //give it a width
    .attr("width", w)
    //and a height
    .attr("height", h)
    //assign a class for styling, use same name as block as a best practice
    .attr("class", "container") 
    .style("background-color", "rgba(30,200,200,60)");
    //start block for the inner rectangle, append a rectangle to it
    var innerRect = container.append("rect")
    //assign a datum
      .datum(350)
      //give it a width
      .attr("width", function(d){
      	//return d*2
          return d * 2;
      })
      //assign rectangle height
      .attr("height", function(d){ 
      	//return that height
          return d;
      })
      //give it a class name, same as the block name
      .attr("class", "innerRect")
      //set the position (px from the upper left corner. horizontally)
      .attr("x", 50)
      //set the position from the top left on the vertical axis
      .attr("y", 50) 
      //give it a nice fill color
      .style("fill", "#FFFFFF");
      //set up variable city pop, an array with 4 cities and populations
    var cityPop = [
        {
            city: 'Columbus, WI',
            population: 5013
        },
        { 
            city: 'Portage, WI',
            population: 10208
        },
        {
            city: 'Poynette, WI',
            population: 2528
        },
        {
            city: 'Lodi, WI',
            population: 3049
        },
    ];
    //set up variable x, creates the scale in d3
    var x = d3.scale.linear()
    //this is the output minimum and maximum
        .range([90, 750])
        //this is the input minimum and maximum
        .domain([0, 3]); 

    //set up variable to find the minimum of the array
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //set up variable to find the maximum value in array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });
    //set the scale for the circles and the center point
    var y = d3.scale.sqrt()
        .range([400, 50])
        .domain([
            -1000,
            14000
        ]);
       //set up a color scale for the circles depending on population from black to white
    var color = d3.scale.linear()
        .range([
        	//the lowest population city should be white
            "#ffffff",
            //the highest population city should be black
            "#000"
        ])
        .domain([
            minPop, 
            maxPop
        ]);
        //this creates an empty selection
    var circles = container.selectAll(".circles")
    //we put the array into the selection
        .data(cityPop)
        // ????
        .enter() 
        //add in the circles
        .append("circle")
        //give it the attributes we gave to "circles"
        .attr("class", "circles")
        .attr("id", function(d){
            return d.city;
        })
        .attr("r", function(d){
            //calculate the radius from the area which is based on population
            var area = d.population * 0.1;
            return Math.sqrt(area/Math.PI);
        })
        //this places the circles horizontally
        .attr("cx", function(d, i){
            return x(i);
        })
        //this places the circles vertically
        .attr("cy", function(d){
            return y(d.population);
        })
        //this adds a fill 
        .style("fill", function(d, i){
            return color(d.population);
        })
        //add a black stroke to the circles
        .style("stroke", "#000");
        //set up variable for the y axis
    var yAxis = d3.svg.axis()
        .scale(y)
        //put it to the left
        .orient("left")
    //create axis
    var axis = container.append("g")
    //set up a class for this with the same name
        .attr("class", "axis")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);
//set up the title variable (appending text to container)
    var title = container.append("text")
    //set up a class of the same name
        .attr("class", "title")
        //center it in the middle
        .attr("text-anchor", "middle")
        //give it an x coordinate
        .attr("x", 450)
        //give it a y coordinate
        .attr("y", 30)
        //what should it say?
        .text("Wisconsin Village and City Populations");
//set up the variable labels
    var labels = container.selectAll(".labels")
    //feed it the cityPop array
        .data(cityPop)
        //???
        .enter()
        //add in the text
        .append("text")
        //set up a class for labels
        .attr("class", "labels")
        //make the labels oriended towards the left
        .attr("text-anchor", "left")
        //put it by the circle, offset by 20px
        .attr("y", function(d){
            return y(d.population) - 20;
        });
    //set up variable for the label for the name of the city
    var nameLine = labels.append("tspan")
    //set up a class of the same name
        .attr("class", "nameLine")
        //put it to the right of each circle
        .attr("x", function(d,i){
            return x(i) + Math.sqrt(d.population * 0.1 / Math.PI) + 7;
        })
        .text(function(d){
            return d.city;
        });
//set up a variable to add the comma back into the pop numbers
    var format = d3.format(",");
    //add the population line for each label
    var popLine = labels.append("tspan")
    //set up styling class for each label's 2nd line
        .attr("class", "popLine")
        //put it next to the circle
        .attr("x", function(d,i){
            return x(i) + Math.sqrt(d.population * 0.1 / Math.PI) + 7;
        })
        //make sure it's below the city name
        .attr("dy", "15")
        .text(function(d){
            return "Pop. " + format(d.population); 
        });
};