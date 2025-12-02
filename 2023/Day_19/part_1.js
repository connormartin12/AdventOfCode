const fs = require('fs');
const lines = fs.readFileSync("puzzle_input.txt", { encoding: 'utf8' }).split('\n');

let workflows = {};
let parts = [];

passedEmptyLine = false;
lines.forEach(line => {
    if (line.length === 0)
        passedEmptyLine = true;
    else if (!passedEmptyLine) {
        let [identifier, workflow] = line.slice(0, -1).split('{');
        workflow = workflow.split(',');
        workflows[identifier] = workflow;
    } else {
        parts.push(line.slice(1, -1).split(','));
    }
});

let sumParts = 0;
function sortPart(part, workflowIdentifier) {
    let newWorkflowIdentifier = undefined;

    let workflow = workflows[workflowIdentifier];
    for (let i = 0; i < (workflow.length - 1); i++) {
        const [option, result] = workflow[i].split(':');
        const letter = option.substring(0, 1);
        const comparison = option.substring(1, 2);
        if (comparison === '<') {
            part.forEach(part => {
                if (part.substring(0, 1) === letter) {
                    if (parseInt(part.slice(2, part.length)) < parseInt(option.slice(2, option.length))) {
                        newWorkflowIdentifier = result;
                    }
                }
            });
        } else {
            part.forEach(part => {
                if (part.substring(0, 1) === letter) {
                    if (parseInt(part.slice(2, part.length)) > parseInt(option.slice(2, option.length))) {
                        newWorkflowIdentifier = result;
                    }
                }
            });
        }
    }
    if (newWorkflowIdentifier === undefined) {
        newWorkflowIdentifier = workflow[workflow.length - 1];
    }
    
    if (newWorkflowIdentifier === 'A') {
        // Add part to sum of parts and return
        part.forEach(part => {
            sumParts += parseInt(part.slice(2, part.length));
        });
        return;
    } else if (newWorkflowIdentifier === 'R') {
        // Do nothing and return part as rejected
        return;
    } else {
        // Go to next workflow in the process
        sortPart(part, newWorkflowIdentifier);
    }
};

parts.forEach(part => {
    sortPart(part, 'in');
});

// sortPart(parts[0], 'in');

console.log(sumParts);
