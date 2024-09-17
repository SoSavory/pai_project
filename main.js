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

class WizardGraph{
    constructor(decision_tree, path, root_node_id){
        this.decision_tree        = Object.freeze(decision_tree);
        this.decision_tree_string = JSON.stringify(this.decision_tree);
        this.root_node_id         = root_node_id;
        this.root_node            = this.decision_tree[this.root_node_id];
        this.path                 = path || [ {to: this.root_node_id, label: ""} ];
    }
}

function getContainer(){
    return this.getOrCreateElement(this.id);
}

function clearContainer(containerReference){
    while(containerReference.firstChild){
        containerReference.removeChild(containerReference.lastChild);
    }
    return containerReference;
}

// recursively builds out a gui from a tree
function buildContents(tree, target, childProcess=false){
    // tree looks like: [{html_id: {content: {type: , textNode: , children: [{key=html id: {}}] }}}]
    var contents = [];

    // clear target. oh you don't want to have to write out creating elements? boo hoo, make more methods and get better at writing trees. caching could happen here
    if(!childProcess){
        console.log(target);
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
        console.log("Attaching");
        console.log(element, target);
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

class Wizard{
    constructor(rootDOMId="wizard-container"){
        this.root_dom_id = rootDOMId;
        this.graph = new WizardGraph(decisionTreePrototype, [], "start");
    }
    listEdges(node_id){
        return JSON.parse(JSON.stringify(this.graph.decision_tree[node_id].edges));
    }
    traverseEdge(edge){
        const to_node = this.graph.decision_tree[edge.to];
        // update path history
        this.graph.path.push(edge);

        if(to_node.is_pai){
            this.isPAI();
            return "pai";
        } else if(to_node.is_not_pai){
            this.isNotPAI();
            return "not pai";
        }

        // update prompt
        const prompt = this.graph.decision_tree[edge.to].prompt;
        const prompt_container = {"prompt-container": {textStart: "Prompt: " + prompt}};
        
        // update answers
        const new_edges = this.listEdges(edge.to);
        var edges_html = new Array(new_edges.length);
        
        // root node for  ew answers
        const answers_html_base = {"answer-container": {type: "ul", children: edges_html}};
        // loop through edges and generate html nodes 
        while(new_edges.length > 0){
            const a = new_edges.pop();
            var new_edge_html = {};
            const new_edge_html_id = "edge-container-" + String(a.to) + "_" + String(new_edges.length);

            new_edge_html[new_edge_html_id] = {
                type: "li", 
                textStart: a.label,
                dataList: [{key: "from_node", value: edge.to}, {key: "to_node", value: a.to}],
                classList: ["clickable-edge"],
                onClick: document.wizard.clickTraverseEdge,
            };
            answers_html_base["answer-container"].children[new_edges.length] = new_edge_html;
        }        
        buildContents(
            [
                answers_html_base,
                prompt_container,
                {"path-container": {}},
                this.returnStartOverButton(),
            ],
            document.getElementById("wizard-container"));
        // update prompt container to reflect that of the edge's destination node
        return "traverse edge";
    }
    isPAI(){
        clearContainer(document.getElementById(this.root_dom_id));
        buildContents([
            {"end-state": {type: "h3", textStart: "The Activity as Described is PAI compliant"}},
            this.returnStartOverButton()
        ], document.getElementById(this.root_dom_id));
    }
    isNotPAI(){
        clearContainer(document.getElementById(this.root_dom_id));
        buildContents([
            {"end-state": {type: "h3", textStart: "The Activity as Described is NOT PAI compliant"}},
            this.returnStartOverButton()
        ], document.getElementById(this.root_dom_id));
    }
    clickTraverseEdge(e){
        document.wizard.traverseEdge({to: e.target.dataset.to_node, label: "label"});
    }
    clickStartOver(e){
        document.wizard.start();
    }
    returnStartOverButton(){
        return new Object( 
            {"start-over-button": {type: "button", textStart: "Start Over", onClick: document.wizard.clickStartOver}}
        );
    }
    initialize(){
        buildContents(
            [
                {"prompt-container": {}},
                {"answer-container": {type: "ul"}},
                {"path-container": {}},
                this.returnStartOverButton(),
            ],
            document.getElementById(this.root_dom_id)
        );
    }
    start(){
        document.wizard = this;
        document.wizard.initialize();
        document.wizard.traverseEdge({to: document.wizard.graph.root_node_id, label: ""});
        console.log("wizard started");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    var wizard = new Wizard();
    wizard.start();
});
