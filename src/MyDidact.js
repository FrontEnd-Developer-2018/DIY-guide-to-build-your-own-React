// 1- myFristSimpleRender
export function myFristSimpleRender(element, parentDom) {
    const { type, props } = element;
    const dom = document.createElement(type);

    // Set properties     
    Object.keys(props).forEach(name => {
        if (name === "style")
            dom.setAttribute("style", props[name]);
        else
            dom[name] = props[name];

    });


    // Add event listeners
    const isListener = name => name.startsWith("on");
    Object.keys(props).filter(isListener).forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, props[name]);
    });

    // Append to parent
    parentDom.appendChild(dom);

}


// 2- myFristSimpleWithChildrenRender
export function myFristSimpleWithChildrenRender(element, parentDom) {
    const { type, props } = element;
    const dom = document.createElement(type);

    // Add event listeners
    const isListener = name => name.startsWith("on");
    Object.keys(props).filter(isListener).forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, props[name]);
    });


    // Set properties
    const isAttribute = name => !isListener(name) && name != "children";
    Object.keys(props).filter(isAttribute).forEach(name => {
        if (name === "style")
            dom.setAttribute("style", props[name]);
        else
            dom[name] = props[name];

    });

    //Recursivité encore une fois
    // c'est de copier/coller, j'avais pas le courage de réflichir comment la résoudre
    const childElements = props.children || [];
    childElements.forEach(childElement => myFristSimpleWithChildrenRender(childElement, dom));

    // Append to parent
    parentDom.appendChild(dom);

}

// 3- All stuff with isTextElement
/*
    
Convention de node de type TEXT
    {
        type: "TEXT ELEMENT",
        props: { nodeValue: "Foo" }
      }
Then is game over
*/
  export function renderFirstCompleteOne(element, parentDom) {
    const { type, props } = element;

    // Create DOM element
    const isTextElement = type === "TEXT ELEMENT";
    const dom = isTextElement
      ? document.createTextNode("")
      : document.createElement(type);

    // Add event listeners
    const isListener = name => name.startsWith("on");
    Object.keys(props).filter(isListener).forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

    // Set properties
    const isAttribute = name => !isListener(name) && name != "children";
    Object.keys(props).filter(isAttribute).forEach(name => {
      dom[name] = props[name];
    });

    // Render children
    const childElements = props.children || [];
    childElements.forEach(childElement => render(childElement, dom));

    // Append to parent
    parentDom.appendChild(dom);
  }




//4- JSX provides some syntactic sugar to create elements
// https://jasonformat.com/wtf-is-jsx/
/*
The only thing we need to add to Didact to support JSX is a createElement function,
 and that’s all, the rest of the work is done by the preprocessor
*/

//https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBApgGzgWzmWBeGAKAUDGAHgBMBLANxlOIwCJR0BDUsOAJ1oD58CiWAHAK6xyjBILh0AZiBC0YUAJ79JtKHAAeUeQHpuvIoxgALNnCl0dAI0YdONtoR2N9vQhH6MwMcAGEEpMAA1hgA3nAwGJwwYuxQ2LQAEqS0AJQAvpzAAcEwqE4eXq5OZOTcqQDcQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=true&sourceType=module&lineWrap=false&presets=es2015%2Ces2016%2Ces2017%2Creact%2Cstage-0%2Cstage-1%2Cstage-2%2Cstage-3%2Ces2015-loose%2Ctypescript%2Cflow&prettier=true&targets=&version=7.11.6&externalPlugins=

export function createElement_draft(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  props.children = hasChildren ? [].concat(...args) : [];
  return { type, props };
}

// The function above  works well except from one thing: text elements

const TEXT_ELEMENT = "TEXT ELEMENT";
 function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}
export function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren
    .filter(c => c != null && c !== false)
    .map(c => c instanceof Object ? c : createTextElement(c));
  return { type, props };
}



function renderxxxx(element, parentDom) {  
  
  // ...
  // Create dom from element
  // ...
  
  // Append or replace dom
  if (!parentDom.lastChild) {
    parentDom.appendChild(dom);     
  } else {
    parentDom.replaceChild(dom, parentDom.lastChild);    
  }
}  


/*

For us to do the same, first we need to preserve the previous rendered tree so we can compare it with the new tree.
In other words, we are going to maintain our own version of the DOM, a virtual DOM.

What should be the “nodes” in this virtual DOM? One option would be to just use Didact Elements, 
they already have a props.children property that allow us to navigate them as a tree. 
But there are two problems, one is that we need to keep a reference to the real dom node 
on each node of the virtual DOM in order to make the reconciliation easier, and we prefer 
to keep the elements immutable. The second problem is that (later) we will need to support 
Components, which have their own state, and elements won’t be able to handle it.

So we need to introduce a new term: instances. An instance represents an element that
has been rendered to the DOM. It’s a plain JS object that has three properties: element, dom, and
childInstances. childInstances is an array with the instances of the children of the element.
*/