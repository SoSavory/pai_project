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

// const decisionTreePrototype = {
//     "start": {prompt: "What are you working on?",
//         edges: [
//             {to: "A", label: "Individual case referral"},
//             {to: "B", label: "Recruiting future partnership"},
//             {to: "C", label: "Developing plans and work for future pro bono work"},
//             {to: "D", label: "Internship recruitment/training/supervision"},
//             {to: "E", label: "Bar association engagement and partnership"},
//             {to: "A", label: "Individual case referral"},
//             {to: "B", label: "Recruiting future partnership"},
//             {to: "C", label: "Developing plans and work for future pro bono work"},
//             {to: "D", label: "Internship recruitment/training/supervision"},
//             {to: "E", label: "Bar association engagement and partnership"},
//             {to: "A", label: "Individual case referral"},
//             {to: "B", label: "Recruiting future partnership"},
//             {to: "C", label: "Developing plans and work for future pro bono work"},
//             {to: "D", label: "Internship recruitment/training/supervision"},
//             {to: "E", label: "Bar association engagement and partnership"},
//             {to: "A", label: "Individual case referral"},
//             {to: "B", label: "Recruiting future partnership"},
//             {to: "C", label: "Developing plans and work for future pro bono work"},
//             {to: "D", label: "Internship recruitment/training/supervision"},
//             {to: "E", label: "Bar association engagement and partnership"}
//         ]
//     },
//     "A": {prompt: "Population Engaged- Are you working with a private attorney or to support private attorney engagement?", 
//         edges: [
//             {to: "A.1", label: "Yes"},
//             {to: "A.2", label: "No"},
//         ]
//     },
//     "A.1": {prompt: "Was this a recent graduate or fellow working at LANC?", 
//         edges: [
//             {to: "B", label: "No"},
//             {to: "E", label: "Yes"}
//         ]
//     },
//     "A.2": {prompt: "Are you working with a student or to support student engagement?",
//         edges: [
//             {to: "A.2.1", label: "Yes"},
//             {to: "A.2.2", label: "No"}
//         ]
//     },
//     "A.2.1": {prompt: "What kind of student?",
//         edges: [
//             {to: "C", label: "Law Student"},
//             {to: "is_not_pai", label: "High School or College Student"}
//         ]
//     },
//     "A.2.2": {prompt: "Are you working with a paralegal or other legal professional?", 
//         edges: [
//             {to: "D", label: "Yes"},
//             {to: "A.3", label: "No"}
//         ]
//     },
//     "A.3": {prompt: "Are you working with a non-lawyer professional?", 
//         edges: [
//             {to: "E", label: "Yes"},
//             {to: "is_not_pai", label: "No"}
//         ]
//     },
//     "B": {prompt: "Private Attorneys- Is this about a case (versus general work with a bar association or firm?", 
//         edges: [
//             {to: "is_pai", label: "Yes"},
//             {to: "is_not_pai", label: "No"}
//         ]
//     },
//     "C": {prompt: "C. Law Students", edges: [{to: "is_not_pai", label: "Placeholder"}]},
//     "D": {prompt: "D. Paralegals", edges: [{to: "is_not_pai", label: "Placeholder"}]},
//     "E": {prompt: "E. Fellows and Law Graduates", edges: [{to: "is_pai", label: "Placeholder"}]},
//     "is_pai": {is_pai: true},
//     "is_not_pai": {is_not_pai: true}
// }

const decisionTreePrototype = {
    "start": {
        prompt: "What are you working on?", 
        edges: [
            {to: "A", label: "Individual case referral, case support, research project, etc."},
            {to: "B", label: "Recruiting future partnerships"},
            {to: "C", label: "Developing plans and work for future pro bono work"},
            {to: "D", label: "Internship recruitment/training/supervision"},
            {to: "E", label: "Bar association, community, and LAC engagement"},
            {to: "F", label: "Training"}
        ]
    },
    "A": {
        prompt: "Who will be working on the case or project?",
        edges: [
            {to: "A.a", label: "Private attorney"},
            {to: "A.b", label: "Unlicensed law school graduate"},
            {to: "A.c", label: "Recent Grad Fellow"},
            {to: "A.d", label: "Paralegal"},
            {to: "A.e", label: "Law student/intern/extern"},
            {to: "is_not_pai", label: "Community member"},
            {to: "is_not_pai", label: "College Student"},
            {to: "A.h", label: "Non-lawyer professional"}
        ]
    },
    "A.a": {
        prompt: "Are you...", 
        edges: [
            {to: "is_pai", label: "Brainstorming ideas for referrals or working on a plan to ge private attorneys involved?"},
            {to: "is_pai", label: "Referring a case or project to a private attorney?"},
            {to: "is_pai", label: "Providing support to volunteer working on case (Answering questions, mentoring, etc)?"},
            {to: "is_pai", label: "Doing case management? (Gathering documents, managing the file, prparing for closing, rejecting case where client withdrew, or closing file)?"},
            {to: "A.a.5", label: "Providing legal assistance when a private attorney didn't complete representation?"},
            {to: "A.a.6", label: "Co-counseling or seeking advice from a private attorney?"},
            {to: "is_not_pai", label: "Providing advice or a private attorney about a non-LANC case?"},
            {to: "A.a.8", label: "Working on contract matters?"}
        ]
    },
    "A.a.5": {
        prompt: "Is this task current or preexisting?", 
        edges: [{to: "is_pai", label: "Preexisting"}, {to: "is_not_pai", label: "Current"}]
    },
    "A.a.6": {
        prompt: "Are you...",
        edges: [
            {to: "is_pai", label: "Actively engaged with the private attorney on this task? (Communication with attorney, work on shared tasks, meetings, and appearances where you are both present)?"},
            {to: "is_not_pai", label: "Working on tasks not specifically shared with or engaging the private attorney?"},
            {to: "is_pai", label: "Asking a private attorney for advice on a case?"}
        ]
    },
    "A.a.8": {
        prompt: "Are you working on recruitment, referral, tracking, mentoring, or closing?", 
        edges: [{to: "is_pai", label: "yes"}, {to: "is_not_pai", label: "No"}]
    },
    "A.b": {
        prompt: "Was this time spent recruiting, training, providing support, reviewing work, or providing feedback?",
        edges: [{to: "is_pai", label: "yes"}, {to: "is_not_pai", label: "no"}]
    },
    "A.c": {
        prompt: "Is this person being paid (by LANC or any other entity) for this activity?",
        edges: [{to: "is_pai", label: "No"}, {to: "is_not_pai", label: "Yes"}]
    },
    "A.d": {
        prompt: "Is this paralegal certified or do they have substantial legal experience?",
        edges: [{to: "is_pai", label: "Yes"}, {to: "is_not_pai", label: "No"}]
    },
    "A.e": {
        prompt: "Were you recruiting, training, providing support, reviewing work, or providing feedback?",
        edges: [{to: "is_pai", label: "Yes"}, {to: "is_not_pai", label: "No"}]
    },
    "A.h": {
        prompt: "Does thie non-lawyer professional have an expertise in something?",
        edges: [{to: "is_pai", label: "Yes"}, {to: "is_not_pai", label: "No"}]
    },
    "B": {prompt: "Placeholder- under construction"},
    "C": {prompt: "Placeholder- under construction"},
    "D": {prompt: "Placeholder- under construction"},
    "E": {prompt: "Placeholder- under construction"},
    "F": {prompt: "Placeholder- under construction"},
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
        this.htmlCache = new DOMStubTree({});
    }
    listEdges(node_id){
        const node = this.graph.decision_tree[node_id];
        if(node.edges){
            // I just want to be clear that calling listEdges should never return an object that could modify an edge
            const rawEdges = JSON.parse(JSON.stringify(this.graph.decision_tree[node_id].edges));
            // set where each edge originated from & its associated prompt when listing them. idk this just seemed like the most convenient place to put this,
            // but it would probably be fine to just run this on the graph at the start
            const honedEdges = rawEdges.map((re) => ({...re, from: String(node_id), prompt: node.prompt}));
            return honedEdges.map((he) => (new GraphEdge(he)));
        } else{
            return [];
        }
    }
    listPath(){
        return JSON.parse(JSON.stringify(this.graph.path));
    }
    // argument edge is a GraphEdge
    // this is the event which signals an update to state/position, as we move from our current position along the specified edge, 
    // where position will update to be that specified by the argument edge.to
    traverseEdge(edge){
        // the object which represents the destination node, edge.to
        const to_node = this.graph.decision_tree[edge.to];
        // the object which will store which gui elements we want to create and attach
        var left_contents = [];
        var right_contents = [];
        // check if we have arrived at an end state, and if so, trigger it. Otherwise, default behavior
        if(to_node.is_pai){
            left_contents.push(this.domStubIsPAI());
        } else if(to_node.is_not_pai){      
            left_contents.push(this.domStubIsNotPAI());
        } else{
            left_contents.push(this.domStubActivities(to_node.prompt, this.listEdges(edge.to)));
        }

        right_contents.push(this.domStubStartOverButton());

        // if()
        // right_contents.push(this.domStubBackButton());

        // update our path
        this.graph.path.push(edge);
        right_contents.push(this.domStubPath(this.listPath())); 

        // rebuild the html/gui to reflect the new prompt and answers for our destination node
        const w = this.domStubWizard(left_contents, right_contents);
        buildContents(w, document.body);

        return "traverse edge";
    }
    // =================================================================================================
    // click event helper methods- 
    // accesses itself from the outside in (document.wizard = this), so click event may be transported and attached from outside of this object
    // =================================================================================================
    clickTraverseEdge(e){
        document.wizard.traverseEdge(new GraphEdge({
            to: e.target.dataset.edge_to_node,
            label: e.target.dataset.edge_label,
            from: e.target.dataset.edge_from_node,
            prompt: e.target.dataset.edge_prev_node_prompt
        }));
    }
    clickStartOver(e){
        document.wizard.start();
    }
    clickBack(e){
        document.wizard.goBack();
    }
    // =================================================================================================
    // domStub helper methods- 
    // they return the domStubs (passed to buildContents), which contain the data necessary to build/update fragments of our html.
    // =================================================================================================
    // end state method
    domStubIsPAI(){
        return new DOMStubTree({html_id: "end-state", type: "h3", textStart: "The Activity as Described is PAI compliant"});
    }
    // end state method
    domStubIsNotPAI(){
        return new DOMStubTree({html_id: "end-state", type: "h3", textStart: "The Activity as Described is NOT PAI compliant"});
    }
    domStubStartOverButton(){
        return new DOMStubTree({html_id: "start-over-button", type: "button", textStart: "Start Over", onClick: document.wizard.clickStartOver});
    }
    domStubBackButton(){
        return new DOMStubTree({html_id: "back-button", type: "button", textStart: "Back", onClick: document.wizard.clickBack});
    }
    domStubPrompt(promptText){
        return new DOMStubTree({html_id: "prompt-container", textStart: "Prompt: " + promptText});
    }
    // argument edges is an array of GraphEdges.
    domStubAnswers(edges){
        var edges_html = new Array(edges.length);
        // root node for answers
        const answers_html_base = new DOMStubTree({html_id: "answer-container", type: "ul", children: edges_html});
        // loop through edges and generate html nodes.
        // each iteration depletes the main argument edges, think of it as a queue. 
        while(edges.length > 0){
            
            const a = edges.pop();
            // use the length of the depleting edges array to create unique ids for our dom stub child nodes
            const edge_html = {
                html_id: "edge-container-" + String(a.to) + "_" + String(edges.length),
                type: "li", 
                textStart: a.label,
                dataList: [
                    {key: "edge_from_node", value: a.from}, 
                    {key: "edge_to_node", value: a.to}, 
                    {key: "edge_label", value: a.label},
                    {key: "edge_prev_node_prompt", value: a.prompt}
                ],
                classList: ["clickable-edge"],
                onClick: document.wizard.clickTraverseEdge,
            };
            edges_html[edges.length] = edge_html;
            
        }        
        return answers_html_base;
    }
    domStubActivities(promptData, answerData){
        const promptContents = this.domStubPrompt(promptData);
        const answerContents = this.domStubAnswers(answerData);
        return new DOMStubTree({html_id: "activity-container", children: [promptContents, answerContents]});
    }
    domStubPath(path){
        var steps_html = new Array(path.length+1);
        steps_html[0] = new DOMStubTree({html_id: "paths-container-header-row", type: "tr", children: [
            new DOMStubTree({type: "th", textStart: "Prompt"}), new DOMStubTree({type: "th", textStart: "Answer"})
        ]});
        // root node for answers
        const steps_html_base = new DOMStubTree({html_id: "paths-container", type: "table", children: steps_html});
        // loop through edges and generate html nodes.
        // each iteration depletes the main argument edges, think of it as a queue. 
        while(path.length > 0){
            
            const a = path.pop();
            // use the length of the depleting edges array to create unique ids for our dom stub child nodes
            const step_html = {
                html_id: "step-container-" + String(a.to) + "-" + String(a.from) + "_" + String(path.length - 1),
                type: "tr", 
                classList: ["path-table-step"],
                children: [
                    new DOMStubTree({type: "td", textStart: String(a.prompt)}),
                    new DOMStubTree({type: "td", textStart: String(a.label)})
                ]
            };
            steps_html[path.length+1] = step_html;
        }      
        return steps_html_base;
    }
    domStubWizard(left_contents, right_contents){
        var wizard_html_base = [
            new DOMStubTree({type: "header", textStart: "Welcome to the PAI Innovation Team Demo"}),
            new DOMStubTree({html_id: "wizard-container", children: 
                [
                    new DOMStubTree({type: "div", html_id: "wizard-left", classList: ["left"], children: left_contents}),
                    new DOMStubTree({type: "div", html_id: "wizard-right", classList: ["right"], children: right_contents})
                ]
            })
        ];
        return wizard_html_base;
    }
    goBack(){
        document.wizard.graph.path.pop();
        for( const edge of document.wizard.graph.path){
            document.wizard.traverseEdge(edge);
        }
    }
    // =============================================================================================
    // starter
    // =============================================================================================
    // attach itself (this) to the document, and "travel" to the starting node
    start(){
        document.wizard = this;
        this.graph.path = [];
        const nullEdge = new GraphEdge({
            from: document.wizard.graph.root_node_id, 
            to: document.wizard.graph.root_node_id,
            label: " ", 
            prompt: "Start"
        });
        document.wizard.traverseEdge(nullEdge);
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
        this.path                 = path || [];
        this.cached_path          = JSON.stringify(this.path);
    }
}

class GraphEdge{
    constructor(obj){
        if(obj.to){
            this.to = String(obj.to);
        }
        if(obj.from){
            this.from = String(obj.from);
        }
        if(obj.prompt){
            this.prompt = String(obj.prompt);
        }
        if(obj.label){
            this.label = String(obj.label);
        }
    }
}

class DOMStubTree{
    constructor(obj){
        if(obj.html_id){
            this.html_id = String(obj.html_id);
        }
        if(obj.type){
            this.type = String(obj.type);
        } else{
            this.type = "div";
        }
        if(obj.textStart){
            this.textStart = String(obj.textStart);
        }
        if(obj.textEnd){
            this.textEnd = String(obj.textEnd);
        }
        if(obj.onClick){
            this.onClick = obj.onClick;
        }
        if(obj.dataList){
            this.dataList = obj.dataList;
        }
        if(obj.children){
            this.children = obj.children;
        } else{
            this.children = false;
        }
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

// recursively builds out a gui from an array of DOMStubTree objects.
// appends html into target dom reference
function buildContents(tree, target, childProcess=false){

    // clear target. oh you don't want to have to write out creating elements? boo hoo, make more methods and get better at writing trees. 
    // caching could happen here :)
    if(!childProcess){
        clearContainer(target);
    }
    
    // depth first search through tree
    for(const leaf of tree){
       
        const dom_node = document.createElement(leaf.type || "div");

        if(leaf.html_id){
            dom_node.id = leaf.html_id;
        }

        // Add text if necessary
        if(leaf.textStart){
            dom_node.appendChild(document.createTextNode(leaf.textStart));
        }

        if(leaf.classList){
            for(c of leaf.classList){
                dom_node.classList += c;
            }
        }

        // comes in as [{key: "key", value: "value"}...]
        if(leaf.dataList){
            for(d of leaf.dataList){
                dom_node.dataset[d.key] = d.value;
            }
        }

        if(leaf.onClick){
            dom_node.addEventListener("click", leaf.onClick);
        }

        // Recurse on children. Depth first.
        // Important to clear ~before~ adding children.
        if(leaf.children){
            buildContents(leaf.children, dom_node, true);
        }

        if(leaf.textEnd){
            dom_node.appendChild(document.createTextNode(leaf.textEnd));
        }
        
        target.appendChild(dom_node);
    }
    return target;
}

document.addEventListener("DOMContentLoaded", () => {
    var wizard = new Wizard();
    wizard.start();
});
