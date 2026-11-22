function terminalOutput()
{
    const output = $("#terminal").children().toArray();
    $("#terminal").empty();
    output.forEach((line, i) => {
        setTimeout(() => {
            $("#terminal").append(line);
            $("#terminal").scrollTop($("#terminal").prop("scrollHeight"));
        }, (i + 1) * 100);
    });
}

terminalOutput();

/*
const clientCommands = {
    "return": {
        displayName: "RETURN",
        description: "Navigate up one directory.",
        action: () => { window.location.href = "../"; }
    },
    "help": {
        displayName: "HELP",
        description: "Provides a list of available commands.",
        action: () => 
            {
                for (const [command, { displayName,description }] of Object.entries(clientCommands))
                {

                    terminalPrint(displayName + " - " + description);
                }
            }
    },
    "exit": {
        displayName: "EXIT",
        description: "Close the window",
        action: () => { window.location.href = "/"; }
    },
    "root": {
        displayName: "ROOT",
        description: "Navigate to the root directory.",
        action: () => { window.location.href = "/"; }
    },
    "clear": {
        displayName: "CLEAR",
        description: "Clear the terminal output.",
        action: () => { window.location.reload(); }
    }
};

function boot()
{
    // clear();
    // enableInput();
    // prompt();
    focusInput();
}

function focusInput()
{
    // $("#input").val("");
    // $("#input").prop('placeholder', "Enter Command...");
    // $("#submit").prop('disabled', false);
    // $("#input").focus();
    $("#input")[0].focus({
        preventScroll: true
    });
}

function submit()
{
    const command = $("#input").val();
    $("#input").val("");

    postCommand(command);

    if (!command || command.trim() === "") return;

    const sanitizedCommand = command.toLowerCase().replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    
    if (clientCommands[sanitizedCommand])
    {
        clientCommands[sanitizedCommand].action();
    }
    else
    {
        const matchingLink = $('a').filter(':visible:not(:disabled)').filter(`[href="${sanitizedCommand}"]`);
        
        if (matchingLink.length > 0)
        {
            window.location.href = matchingLink.attr('href');
        }
        else
        {
            terminalPrint("'"+command+"' is not a recognized command.", true);
        }
    }
}

function postCommand(command)
{
    terminalPrint("> " + command)
}

function terminalPrint(line, spacing = false)
{
    const output = $("<p>");
    if(spacing) output.addClass("eol");
    output.text(line);
    $("#terminal-output").append(output);
    $("#terminal").scrollTop($("#terminal").prop("scrollHeight"));
}


// function disableInput()
// {
//     $("#input").val("");
//     // $("#input").prop('placeholder', "");
//     $("#submit").prop('disabled', true);
// }

// function closePrompt(commmand)
// {
//     $("#prompt").append(commmand);
//     $("#prompt").removeAttr('id');
// }

boot();

$("#terminal-input").on('submit', function (e) {
    e.preventDefault();
    submit();
});

// $('#input').on('keydown', function(e) {
//     $("#terminal").scrollTop($("#terminal").prop("scrollHeight"));
//     if (e.key === 'Tab' && !e.shiftKey) {
//         e.preventDefault();

        

//         let $firstItem = $activeLinks.filter('[tabindex="1"]');
        
//         if ($firstItem.length === 0) {
//             $firstItem = $activeLinks.first();
//         }

//         $firstItem.focus();
//     }
// });
$(document).on('keydown', function(e) {
    if (e.key !== 'Tab') return;

    const selector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
    const $focusable = $(document).find(selector).filter(':visible');
    
    if ($focusable.length === 0) return;

    const $current = $(document.activeElement);
    const $first = $focusable.first();
    const $last = $focusable.last();

    if (e.shiftKey && $current.is($first)) {
        e.preventDefault();
        $last.focus();
    } 
    else if (!e.shiftKey && $current.is($last)) {
        e.preventDefault();
        $first.focus();
    }
});

$(document).on('focusin', function() {
    var focusedElement = $(document.activeElement);
     if (focusedElement.is('#input')) return;

    if (focusedElement.is('a'))
    {
        $('#input').val(focusedElement.attr('href'));
    }
    else
    {
        $('#input').val('');
    }
});

$(document).on('mouseenter', 'a', function(e) {
    if (e.relatedTarget === null || e.relatedTarget.nodeName === 'HTML') { return; }
    $(this).focus();
});

$(document).on('click', 'a', function(e) {
    var href = $(this).attr('href');
    
    if ($.inArray(href, clientCommands) !== -1)
    {
        e.preventDefault(); // Stop the browser from navigating away
        
        // Put the URL into the hidden form field
        //$('#form-href-input').val(href);
        
        // Programmatically submit the form
        $('#terminal-input').submit();
    }
});

// $(document).on('click', function(e) {
//     $('#input').focus();
// });

// //Terminal Vars
// var debug = false;

// const remoteFunctions = 
// {
//     "clear": function(){
//         clear();
//     },
//     "debug": function(){
//         debug = !debug;
//     }
// }

// const flags = 
// {
//     normal: 0,
//     warn: 1
// }


    



// function clear()
// {
//     $("#terminal-output").empty();
//     $("#input").val("");
//     disableInput();
// }



// async function enableInput()
// {
//     $("#input").val("");
//     $("#input").prop('placeholder', "Enter Command...");
//     $("#submit").prop('disabled', false);
//     $("#input").focus();
// }



// function prompt()
// {
//     const prompt = $("<div>", {"class": "output-line","id":"prompt"});
//     const user = $("<span>",{"class":"terminal-user"});
//     user.text("@guest");
    
//     prompt.append(user);
//     prompt.append(">");
//     $("#terminal-output").append(prompt);
//     $("#terminal-output").scrollTop($("#terminal-output").prop("scrollHeight"));
// }

// function closePrompt(commmand)
// {
//     $("#prompt").append(commmand);
//     $("#prompt").removeAttr('id');
// }

// function output(message,flag=0)
// {
//     var messageType = "";
//     if (flag == 1) messageType = " warn";

//     const prompt = $("<div>", {"class": "output-line "+messageType});
//     prompt.append(message);
//     $("#terminal-output").append(prompt);
//     $("#terminal-output").scrollTop($("#terminal-output").prop("scrollHeight"));
// }

// async function send(command){
//     const response = await fetch('/api/terminal/c/'+command);
//     const message = await response.json();

//     if(debug){output(JSON.stringify(message),flags.warn);}

    

//     if(message.response)
//     {
//         message.response.forEach(msg => {
//             output(msg);
//         });
//         output("\xa0");
//     }

//     if(message.function)
//     {
//         if(remoteFunctions[message.function])
//         {
//             remoteFunctions[message.function]();
//         }
//     }
    
//     prompt();
//     enableInput();
// }

// boot();

*/