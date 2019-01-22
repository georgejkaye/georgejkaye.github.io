/**
 * Functions to generate and draw the lambda term maps.
 * 
 * @author George Kaye
 */

/** Array containing all node ids used in the current graph */
var nodes = [];
/** Array containing all node objects used in the current graph */
var nodeObjs = [];
/** Array containing all edge ids used in the current graph */
var edges = [];
/** The graph object */
var cy = undefined;
/** Constants to represent the location of a child relative to its parent */
const LHS = 0;
const RHS = 1;
/** The distance between adjacent nodes in the X direction */
const nodeDistanceX = 30;
/** The distance between adjacent nodes in the Y direction */
const nodeDistanceY = 30;

/** Constants for the different types of graph elements */
/** A node representing an abstraction */
const absNode = "abs-node";
/** A node representing an abstraction of a free variable */
const absNodeFree = "abs-node-free";
/** An edge carrying an abstraction */
const absEdge = "abs-edge";
/** A node representing an application */
const appNode = "app-node";
/** An edge carrying an application */
const appEdge = "app-edge";
/** A node supporting a variable */
const varNode = "var-node";
/** A node supporting a variable at the top of the page */
const varNodeTop = "var-node-top";
/** An edge carrying a variable (no label) */
const varEdge = "var-edge";
/** An edge carrying a variable (with label) */
const varEdgeLabel = "var-label-edge";

/** A lambda character */
const lambda = "\u03BB";

/**
 * Reset the nodes and edges arrays
 */
function reset(){
    nodes = [];
    nodeObjs = [];
    edges = [];
    cy = undefined;
    firstNode = undefined;
    parent = [0,0];
    parentType = undefined;
}

/**
 * Generate the elements of the map of a term.
 * @param   {Object}      term       - The lambda term to generate the elements of the map for.  
 * @param   {Object[]}    ctx        - The context containing all the free variables.
 * @param   {Object[]}    array      - The array to put the elements in. 
 * @param   {string}      parent     - The ID of the parent of the current term. 
 * @param   {number}      parentX    - The x coordinate of the parent. 
 * @param   {number}      parentY    - The y coordinate of the parent.
 * @param   {number}      position   - The position relative to the parent (LHS or RHS) of the current element.
 * @return  {Object[]}               - The array of map elements.
 */
function generateMapElements(term, ctx, array, parent, parentX, parentY, position){

    /* If there is no context, create one */
    if(ctx === undefined){
        ctx = new LambdaEnvironment();
    }

    /* If there is no element array, create one */
    if(array === undefined){
        array = [];
    }

    var posX = 0;
    var posY = 0;

    /* If this is the start of the map, create a root node. */
    if(parent === undefined){

        parent = ">";
        parentX = 0;
        parentY = 0;

        var rootNode = createNode(">", "root-node", parentX, parentY);
        array = pushNode(array, rootNode);

        posX = parentX;
        posY = parentY - nodeDistanceY;

    } else {

        posY = parentY - nodeDistanceY;

        if(position === LHS){
            posX = parentX - nodeDistanceX; 
        } else {
            posX = parentX + nodeDistanceX;
        }
    }

    var newNodeID = "";
    var newEdgeID = "";
    var newEdgeType = "";

    switch(term.getType()){
        case ABS:

            var abstractionLabel = term.label;

            newNodeID = checkID(lambda + abstractionLabel + ".", nodes);
            
            array = defineNode(array, newNodeID, absNode, posX, posY);
    
            newEdgeID = checkID(newNodeID + " " + term.t.prettyPrintLabels(), edges);
            newEdgeType = absEdge;

            /* The abstracted variable goes NE */
            const lambdaAbstractionSupportNodeID = checkID(lambda + abstractionLabel + "._abstraction_node_right", nodes);
            array = defineNode(array, lambdaAbstractionSupportNodeID, varNode, posX + nodeDistanceX, posY - nodeDistanceY);

            const lambdaAbstractionSupportEdgeID = checkID(lambda + abstractionLabel + "._node_from_abstraction_to_right", edges);
            array = defineEdge(array, lambdaAbstractionSupportEdgeID, varEdge, newNodeID, lambdaAbstractionSupportNodeID);

            /* The abstracted variable travels to the top of the map */
            const lambdaAbstractionSupportNode2ID = checkID(lambda + abstractionLabel + "._abstraction_node_top", nodes);
            array = defineNode(array, lambdaAbstractionSupportNode2ID, varNodeTop, posX + nodeDistanceX, posY - (2 * nodeDistanceY));

            const lambdaAbstractionSupportEdge2ID = checkID(lambda + abstractionLabel + "._edge_from_abstraction_to_top", edges);
            array = defineEdge(array, lambdaAbstractionSupportEdge2ID, varEdge, lambdaAbstractionSupportNodeID, lambdaAbstractionSupportNode2ID);

            /* Generate the elements for the scope of the abstraction */
            ctx.pushTerm(abstractionLabel, lambdaAbstractionSupportNode2ID);
            var scopeArray = generateMapElements(term.t, ctx, [], newNodeID, posX, posY, LHS);
            ctx.popTerm();
            
            const rightmostScope = furthestRight(scopeArray);

            /* Make sure the scope is entirely to the left of the abstraction node */
            if(rightmostScope >= posX){
                scopeArray = shiftXs(scopeArray, -(rightmostScope - posX) - nodeDistanceX);
            }

            for(i = 0; i < scopeArray.length; i++){
                array.push(scopeArray[i]);
            }

            break;
            
        case APP:
            
            newNodeID = checkID("[" + term.t1.prettyPrintLabels() + " @ " + term.t2.prettyPrintLabels() + "]", nodes);
            array = defineNode(array, newNodeID, appNode, posX, posY);

            newEdgeID = checkID("(" + newNodeID + ")", edges);
            newEdgeType = appEdge;
            
            /* Generate the elements for the LHS of the application */
            var lhsArray = generateMapElements(term.t1, ctx, [], newNodeID, posX, posY, LHS);
            const rightmostLHS = furthestRight(lhsArray);

            /* Generate the elements for the RHS of the application */
            var rhsArray = generateMapElements(term.t2, ctx, [], newNodeID, posX, posY, RHS);
            const leftmostRHS = furthestLeft(rhsArray);

            /* Make sure the LHS is entirely to the left of the application node */
            if(rightmostLHS >= posX){
                lhsArray = shiftXs(lhsArray, -(rightmostLHS - posX) - nodeDistanceX);
            }

            /* Make sure the RHS is entirely to the right of the application node */
            if(leftmostRHS <= posX){
                rhsArray = shiftXs(rhsArray, (posX - leftmostRHS) + nodeDistanceX);
            }

            for(i = 0; i < lhsArray.length; i++){
                array.push(lhsArray[i]);
            }

            for(j = 0; j < rhsArray.length; j++){
                array.push(rhsArray[j]);
            }

            break;

        case VAR:

            var variableLabel = ctx.determine(term.index);
            
            newNodeID = checkID(variableLabel, nodes);

            array = defineNode(array, newNodeID, varNode, posX, posY);

            newEdgeID = checkID(variableLabel + " in " + parent + "_edge_from_parent_to_variable", edges);
            newEdgeType = varEdge;

            /* The variable needs to come from the top of the map */

            var id = "";

            if(!nodes.includes(lambda + variableLabel + ".")){
                const freeVariableAbstractionID = checkID(lambda + variableLabel + ".", nodes);
                array = defineNode(array, freeVariableAbstractionID, absNodeFree, posX, posY - nodeDistanceY);
                id = freeVariableAbstractionID;
            } else {
                id = ctx.getNode(term.index);
            }

            const lambdaVariableSupportNodeID = checkID(variableLabel + "_abstraction_node_top", nodes);
            array = defineNode(array, lambdaVariableSupportNodeID, varNodeTop, posX, posY - nodeDistanceY);

            const lambdaVariableSupportEdgeID = checkID(variableLabel + " in " + parent + "_edge_from_top_to_variable", edges);
            array = defineEdge(array, lambdaVariableSupportEdgeID, varEdge, lambdaVariableSupportNodeID, newNodeID);

            /* The variable comes from the corresponding abstraction node at the top of the map */

            const lambdaVariableAbstractionEdgeID = checkID(variableLabel + " in " + parent + "_curved_edge_from_abstraction_to_variable", edges);
            array = defineEdge(array, lambdaVariableAbstractionEdgeID, varEdgeLabel, id, lambdaVariableSupportNodeID);


            break;
    }

    /* Create an edge linking the newest node with its parent */
    array = defineEdge(array, newEdgeID, newEdgeType, newNodeID, parent);

    return array;
    
}

/**
 * Define a node and add it to the array of map elements
 * @param {Object[]} array  - The array of all the map elements.
 * @param {string} id       - The desired node ID.
 * @param {string} type     - The type of this node. 
 * @param {number} posX     - The x coordinate of this node.
 * @param {number} posY     - The y coordinate of this node.
 * @return {Object[]} The updated array of map elements.
 */
function defineNode(array, id, type, posX, posY){
    
    const nodeID = checkID(id, nodes);
    const node = createNode(nodeID, type, posX, posY);
    array = pushNode(array, node, nodeID);

    return array;
}

/**
 * Define an edge and add it to the array of map elements
 * @param {Object[]} array  - The array of all the map elements.
 * @param {string} id       - The desired edge ID.
 * @param {string} type     - The type of edge. 
 * @param {number} source   - The source of this edge.
 * @param {number} target   - The target of this edge.
 * @return {Object[]} The updated array of map elements.
 */
function defineEdge(array, id, type, source, target){
    
    const edgeID = checkID(id, edges);
    const edge = createEdge(edgeID, type, source, target);
    array = pushEdge(array, edge, edgeID);

    return array;
}

/**
 * Create a node on the map.
 * @param {string} id   - The id of the node.
 * @param {string} type - The type of the node.
 * @param {number} x    - The x coordinate of the node (optional).
 * @param {number} y    - The y coordinate of the node (optional).
 * @return {Object} The node object.
 */
function createNode(id, type, x, y){
    
    if(x === undefined || y === undefined){
        return { data: { id: id, type: type}};
    }

    return { data: { id: id, type: type}, position: {x: x, y: y}};

}

/**
 * Create an edge on the map.
 * @param {string} id       - The id of the edge .
 * @param {string} type     - The type of the edge.
 * @param {string} source   - The source of the edge.
 * @param {string} target   - The target of the edge.
 * @return {Object} The edge object.
 */
function createEdge(id, type, source, target){
    return { data: { id: id, source: source, target: target, type: type}};
}

/**
 * Push a node onto the various arrays.
 * @param {Object[]} array - The array all the elements are stored in.
 * @param {Object} node - The node object.
 * @param {string} nodeID - The node ID.
 * @return {Object[]} The updated array all the elements are stored in.
 */
function pushNode(array, node, nodeID){
    smartPush(array, node);
    smartPush(nodes, nodeID);
    smartPush(nodeObjs, node);

    return array;
}

/**
 * Push an edge onto the various arrays.
 * @param {Object[]} array - The array all the elements are stored in.
 * @param {Object} edge - The edge object.
 * @param {string} edgeID - The edge ID.
 * @return {Object[]} The updated array all the elements are stored in.
 */
function pushEdge(array, edge, edgeID){
    smartPush(array, edge);
    smartPush(edges, edgeID);

    return array;
}

/**
 * Check to make sure an id is not used in an array, and suffixes a prime (') after it if it does.
 * @param {string} id - The id to check.
 * @param {Object[]} array - The array to search for duplicates in.
 * @return {string} The id, suffixed with primes if necessary.
 */
function checkID(id, array){
    
    while(array.includes(id)){
        id += "\'";
    }

    return id;
}

/**
 * Get the furthest left x coordinate of a node in an array of elements
 * @param {Object[]} array - The array of elements
 * @return {number} the furthest left x coordinate
 */
function furthestLeft(array){

    left = array[0].position.x;

    for(i = 1; i < array.length; i++){

        if(array[i].position !== undefined){
            const newLeft = array[i].position.x;

            if(newLeft < left){
                left = newLeft;
            }
        }
    }

    return left;
}

/**
 * Get the furthest right x coordinate of a node in an array of elements.
 * @param {Object[]} array - The array of elements.
 * @return {number} the furthest left x coordinate.
 */
function furthestRight(array){

    var right = array[0].position.x;

    for(i = 1; i < array.length; i++){

        if(array[i].position !== undefined){
            const newRight = array[i].position.x;

            if(newRight > right){
                right = newRight;
            }
        }
    }

    return right;
}

/**
 * Shift all the x coordinates of nodes in an array of elements.
 * @param {Object[]} array - The array of elements. 
 * @param {number} x - The amount to shift the x coordinates. 
 * @param {Object[]} - The array with all the elements shifted.
 */
function shiftXs(array, x){

    for(i = 0; i < array.length; i++){
        if(array[i].position !== undefined){

            array[i].position.x += x;
        } 
    }

    return array;
}

/**
 * Update a particular part of the style of the map
 * @param {string} selector - The selector to change the part of the style for. 
 * @param {string} part     - The part of the style to change.
 * @param {string} style    - The style to change the part to.
 */
function updateStyle(selector, part, style){
    cy.style().selector(selector).style({[part] : style}).update();
}

/**
 * Update the node labels of a specific type
 * @param type  - The type of node to change the labels of.
 * @param label - The label to change the nodes to
 */
function updateNodeLabels(type, label){
    updateStyle('node[type = \"' + type + '\"]', 'label', label);
}

/**
 * Update the edge labels of a specific type
 * @param type  - The type of edge to change the labels of.
 * @param label - The label to change the nodes to
 */
function updateEdgeLabels(type, label){
    updateStyle('edge[type = \"' + type + '\"]', 'label', label);
}

/**
 * Update the labels on the map
 * @param {boolean} labels - Whether labels are shown
 */
function updateLabels(labels){

    if(labels){
        
        updateNodeLabels(absNode, lambda);
        updateNodeLabels(absNodeFree, lambda);
        updateNodeLabels(appNode, '@');
        updateEdgeLabels(absEdge, 'data(id)');
        updateEdgeLabels(varEdgeLabel, function(ele){
            var id = ele.data().id.substring(0);
            var res = id.split(" ");
            return res[0];
        });

        updateEdgeLabels(appEdge, function(ele){
            
            var terms = ele.data().id.substring(2, ele.data().id.length - 2).split(" @ ");

            if(terms[1].split(" ").length > 1){
               terms[1] = "(" + terms[1] + ")";
            }

            if(terms[0].substring(0,1) === lambda){
                terms[0] = "(" + terms[0] + ")";
            }

            return terms[0] + " " + terms[1];

        });

    } else {
       updateStyle('node', 'label', '');
       updateStyle('edge', 'label', '');

    }
}

/**
 * Place free variables in a pretty way to the right of the map.
 * @param {Object[]} boundVariables - The bound variables in the map.
 * @param {Object[]} freeVariables  - The free variables in the map.
 * @param {Object[]} ctx            - The context of the map (for positioning free variables in order of abstraction)
 */
function placeFreeVariables(boundVariables, freeVariables, ctx){

    var rightest = 0;

    for(i = 0; i < boundVariables.length; i++){
        
        var newX = boundVariables[i].position('x');

        if(newX > rightest){
            rightest = newX;
        }

    }

    for(j = 0; j < freeVariables.length; j++){

        var id = freeVariables[j].data('id');
        var k = ctx.find(id.substring(1).substring(0, id.length - 2));

        freeVariables[j].position('x', rightest + (k + 1) * nodeDistanceX * 2);

    }

    for(l = 0; l < ctx.length(); l++){

        var free = ctx.get(l);
        var varID = lambda + free + ".";

        if(!nodes.includes(varID)){
            cy.add(defineNode([], varID, absNodeFree, rightest + (ctx.find(free) + 1) * nodeDistanceX * 2, 0)[0]);
        }
    }

}

/**
 * Get the text to use in a selector for a type.
 * @param {string} type - The type to select.
 */
function getTypeText(type){
    return '[type = \"' + type + '\"]';
}

/**
 * Get the text to use in a selector for nodes of a given type
 * @param {string} type - The type of node to select. 
 */
function getNodeTypeText(type){
    return 'node' + getTypeText(type);
}

/**
 * Draw a graph representing a lambda term into the graph box.
 * @param {string} id       - The id of the graph box.
 * @param {Object} term     - The term to draw as a graph.
 * @param {string[]} ctx    - The context of the term, containing all free variables.
 * @param {boolean} zoom    - Whether zooming is enabled.
 * @param {boolean} pan     - Whether panning is enabled.
 * @param {boolean} labels  - Whether labels should be displayed.
 * @return {Object[]} - The array of elements in this graph, for future use.
 */
function drawGraph(id, term, ctx, zoom, pan, labels){

    reset();
    
    elems = generateMapElements(term, ctx);

    cy = cytoscape({
        container: document.getElementById(id),

        elements: elems,
    
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'text-valign': 'center',
                    'color': 'white',
                    'width': '15',
                    'height': '15',
                    'font-size': '10'
                }
            },
    
            {
                selector: 'node[type =\"' + varNode + '\"], node[type =\"' + varNodeTop + '\"]',
                style: {
                    'width': '5',
                    'height': '5',
                    'background-color': '#ccc',
                    'shape': 'roundrectangle',
                    'color': 'black'
                }
            },

            {
                selector: 'node[type =\"' + absNodeFree + '\"]',
                style: {
                    'background-color': 'red'
                }
            },

            {
                selector: 'edge',
                style: {
                'width': 2,
                'line-color': '#ccc',
                'mid-target-arrow-color': '#ccc',
                'mid-target-arrow-shape': 'triangle',
                'arrow-scale': '0.8',
                'font-size': '6'
                }
            },

            {
                selector: 'edge[type = \"' + varEdgeLabel + '\"]',
                style: {
                    'curve-style': 'unbundled-bezier',
                    'control-point-distances': function(ele){
                        
                        var source = ele.source();
                        var target = ele.target();

                        var diff = source.position('x') - target.position('x');

                        return diff / 2;

                    },
                    'control-point-weights': '0.5',
                    'loop-direction': '45deg',
                    'edge-distances': 'node-position'
                    
                }
            },

            {
                selector: '.global',
                style: {
                    'background-color': '#f00'
                }
            },

            {
                selector: '.dashed',
                style: {
                    'width': 5
                }
            },

        ],

        layout: {
            name: 'preset'
        },

        userZoomingEnabled: zoom,
        userPanningEnabled: pan,
    });

    const nodes = cy.elements("node");
    var highest = 0;

    for(i = 0; i < nodes.length; i++){
        
        const y = nodes[i].position('y');

        if(y < highest){
            highest = y;
        }
    }

    placeFreeVariables(cy.elements(getNodeTypeText(varNodeTop)), cy.elements(getNodeTypeText(absNodeFree)), ctx);

    cy.elements(getNodeTypeText(varNodeTop) + ', ' + getNodeTypeText(absNodeFree)).position('y', highest - nodeDistanceY / 2);
    cy.fit(cy.filter(function(ele, i, eles){return true;}), 10);

    updateLabels(labels);
    
    return cy;

}