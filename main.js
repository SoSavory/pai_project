// Objects whose data convey the logical positions of the decision tree which determines whether activity is pai or not.
const decisionTreeTestPrototype = {
    "start": {prompt: "Which Letter is Valid?", 
        edges: [
        {to: "A", label: "A"},
        {to: "B", label: "B"}
    ]},
    "A": {prompt: "Which Number is Valid?", 
        edges: [
            {to: "0", label: "0"},
            {to: "1", label: "1"}
        ]},
    "B": {prompt: "Which Number is Valid?", 
        edges: [
            {to: "1", label: "1"},
            {to: "2", label: "2"}
        ]},
    "0": {prompt: "Which Number is Valid?", 
        edges: [
            {to: "1", label: "1"},
            {to: "2", label: "2"}
        ]},
    "1": {is_pai: true},
    "2": {is_not_pai: true}
};

const decisionTreePrototype = {
    "start": {prompt: "What are you working on?",
        edges: [
            {to: "A", label: "Individual case referral"},
            {to: "B", label: "Recruiting future partnership"},
            {to: "C", label: "Developing plans and work for future pro bono work"},
            {to: "D", label: "Internship recruitment/training/supervision"},
            {to: "E", label: "Bar association engagement and partnership"}
        ]
    },
    "A": {prompt: "Population Engaged- Are you working with a private attorney or to support private attorney engagement?", 
        edges: [
            {to: "A.1", label: "Yes"},
            {to: "A.2", label: "No"},
        ]
    },
    "A.1": {prompt: "Was this a recent graduate or fellow working at LANC?", 
        edges: [
            {to: "B", label: "No"},
            {to: "E", label: "Yes"}
        ]
    },
    "A.2": {prompt: "Are you working with a student or to support student engagement?",
        edges: [
            {to: "A.2.1", label: "Yes"},
            {to: "A.2.2", label: "No"}
        ]
    },
    "A.2.1": {prompt: "What kind of student?",
        edges: [
            {to: "C", label: "Law Student"},
            {to: "is_not_pai", label: "High School or College Student"}
        ]
    },
    "A.2.2": {prompt: "Are you working with a paralegal or other legal professional?", 
        edges: [
            {to: "D", label: "Yes"},
            {to: "A.3", label: "No"}
        ]
    },
    "A.3": {prompt: "Are you working with a non-lawyer professional?", 
        edges: [
            {to: "E", label: "Yes"},
            {to: "is_not_pai", label: "No"}
        ]
    },
    "B": {prompt: "Private Attorneys- Is this about a case (versus general work with a bar association or firm?", 
        edges: [
            {to: "is_pai", label: "Yes"},
            {to: "is_not_pai", label: "No"}
        ]
    },
    "C": {prompt: "C. Law Students", edges: [{to: "is_not_pai", label: "Placeholder"}]},
    "D": {prompt: "D. Paralegals", edges: [{to: "is_not_pai", label: "Placeholder"}]},
    "E": {prompt: "E. Fellows and Law Graduates", edges: [{to: "is_pai", label: "Placeholder"}]},
    "is_pai": {is_pai: true},
    "is_not_pai": {is_not_pai: true}
}

// ===========================================================================================
// Wizard class
// controls the logic for representing and updating the internal, graph described state of the pai wizard concept,
// as well as the gui necessary to interact with the wizard
// ===========================================================================================
class Wizard{
    constructor(rootDOMId="wizard-container"){
        this.root_dom_id = rootDOMId;
        this.graph = new WizardGraph(decisionTreePrototype, [], "start");
    }
    listEdges(node_id){
        // I just want to be clear that this should never modify an edge
        const rawEdges = JSON.parse(JSON.stringify(this.graph.decision_tree[node_id].edges));
        // set where each edge originated from when listing them. idk this just seemed like the most convenient place to put this,
        // but it would probably be fine to just run this on the graph at the start
        const honedEdges = rawEdges.map((re) => ({...re, from: String(node_id)}));
        return honedEdges;
    }
    // argument edge is a plain object shaped as such: {from: node_id, to: node_id, label: ""}
    // this is the event which signals an update to state/position, as we move from our current position along the specified edge, 
    // where position will update to be that specified by the argument edge.to
    traverseEdge(edge){
        // the object which represents the destination node, edge.to
        const to_node = this.graph.decision_tree[edge.to];

        // 

        // check if we have arrived at an end state, and if so, trigger it.
        if(to_node.is_pai){
            this.isPAI();
            return "pai";
        } else if(to_node.is_not_pai){
            this.isNotPAI();
            return "not pai";
        }

        // destination node's prompt, a string
        const newPrompt = to_node.prompt; 
        // destination node's answers, an array of objects just like main argument edge
        const newAnswers = this.listEdges(edge.to);

        // rebuild the html/gui to reflect the new prompt and answers for our destination node
        buildContents(
            [
                this.domStubActivities(newPrompt, newAnswers),
                {"path-container": {}},
                this.domStubStartOverButton(),
            ],
            document.getElementById(this.root_dom_id));
        return "traverse edge";
    }
    // end state method
    isPAI(){
        buildContents([
            {"end-state": {type: "h3", textStart: "The Activity as Described is PAI compliant"}},
        ], document.getElementById("activity-container"));
    }
    // end state method
    isNotPAI(){
        buildContents([
            {"end-state": {type: "h3", textStart: "The Activity as Described is NOT PAI compliant"}},
        ], document.getElementById("activity-container"));
    }
    // =================================================================================================
    // click event helper methods- 
    // accesses itself from the outside in (document.wizard = this), so click event may be transported and attached from outside of this object
    // =================================================================================================
    clickTraverseEdge(e){
        document.wizard.traverseEdge({to: e.target.dataset.to_node, label: e.target.dataset.label});
    }
    clickStartOver(e){
        document.wizard.start();
    }
    // =================================================================================================
    // domStub helper methods- 
    // they return the domStubs (passed to buildContents), which contain the data necessary to build/update fragments of our html.
    // =================================================================================================
    domStubStartOverButton(){
        return new Object( 
            {"start-over-button": {type: "button", textStart: "Start Over", onClick: document.wizard.clickStartOver}}
        );
    }
    domStubPrompt(promptText){
        return new Object({"prompt-container": {textStart: "Prompt: " + promptText}});
    }
    // argument edges is an array of {from: node_id, to: node_id, label: "text"} shaped objects.
    domStubAnswers(edges){
        var edges_html = new Array(edges.length);
        // root node for answers
        const answers_html_base = {"answer-container": {type: "ul", children: edges_html}};
        // loop through edges and generate html nodes.
        // each iteration depletes the main argument edges, think of it as a queue. 
        while(edges.length > 0){
            const a = edges.pop();
            var edge_html = {};
            // use the length of the depleting edges array to create unique ids for our dom stub child nodes
            const edge_html_id = "edge-container-" + String(a.to) + "_" + String(edges.length);

            edge_html[edge_html_id] = {
                type: "li", 
                textStart: a.label,
                dataList: [{key: "from_node", value: a.from}, {key: "to_node", value: a.to}, {key: "label", value: a.label}],
                classList: ["clickable-edge"],
                onClick: document.wizard.clickTraverseEdge,
            };
            answers_html_base["answer-container"].children[edges.length] = edge_html;
        }        
        return answers_html_base;
    }
    domStubActivities(promptData, answerData){
        const promptContents = this.domStubPrompt(promptData);
        const answerContents = this.domStubAnswers(answerData);
        
        return new Object(
            {"activity-container": {children: [answerContents, promptContents]}}
        );
    }
    // =============================================================================================
    // initializer + starter
    // =============================================================================================
    initialize(){
        buildContents(
            [
                this.domStubActivities("", []),
                {"path-container": {}},
                this.domStubStartOverButton(),
            ],
            document.getElementById(this.root_dom_id)
        );
    }
    // attach itself (this) to the document, and "travel" to the starting node
    start(){
        document.wizard = this;
        document.wizard.initialize();
        document.wizard.traverseEdge({from: "", to: document.wizard.graph.root_node_id, label: ""});
    }
}

// ============================================================================================
// wizardgraph class- helper class for graph navigation. prime refactoring candidate.
// ============================================================================================
class WizardGraph{
    constructor(decision_tree, path, root_node_id){
        this.decision_tree        = Object.freeze(decision_tree);
        this.decision_tree_string = JSON.stringify(this.decision_tree);
        this.root_node_id         = root_node_id;
        this.root_node            = this.decision_tree[this.root_node_id];
        this.path                 = path || [ {to: this.root_node_id, label: ""} ];
    }
}

// ============================================================================================
// html helper methods- for navigating and common operations on html elements from javascript
// ============================================================================================
function clearContainer(containerReference){
    while(containerReference.firstChild){
        containerReference.removeChild(containerReference.lastChild);
    }
    return containerReference;
}

// recursively builds out a gui from a dom stub represented by a plain object structured as a tree.
// appends html into target dom reference
function buildContents(tree, target, childProcess=false){
    // tree looks like: [{html_id: {content: {type: , textNode: , children: [{key=html id: {}}] }}}]
    var contents = [];

    // clear target. oh you don't want to have to write out creating elements? boo hoo, make more methods and get better at writing trees. caching could happen here
    if(!childProcess){
        clearContainer(target);
    }
    
    for(const leaf of tree){
        const dom_id = Object.keys(leaf)[0];
        const node = leaf[dom_id] || {};
        const dom_node = getOrCreateElement(dom_id, node.type);

        // Add text if necessary
        if(node.textStart){
            dom_node.appendChild(document.createTextNode(node.textStart));
        }

        if(node.classList){
            for(c of node.classList){
                dom_node.classList += c;
            }
        }

        // comes in as [{key: "key", value: "value"}...]
        if(node.dataList){
            for(d of node.dataList){
                dom_node.dataset[d.key] = d.value;
            }
        }

        if(node.onClick){
            dom_node.addEventListener("click", node.onClick);
        }

        // Recurse on children.
        // Important to clear before adding children.
        if(node.children){
            buildContents(node.children, dom_node, true);
        }

        if(node.textEnd){
            dom_node.appendChild(document.createTextNode(node.textEnd));
        }

        contents.push(dom_node);
    }

    while(contents.length > 0){
      
        const element = contents.pop();
        target.appendChild(element);
    }
    
    return target;
}

function getOrCreateElement(id, type="div"){
    var element = document.getElementById(id);
    if(!element){
        element = document.createElement(type);
        element.id = id;
    }
    return element;
}

document.addEventListener("DOMContentLoaded", () => {
    var wizard = new Wizard();
    wizard.start();
});
