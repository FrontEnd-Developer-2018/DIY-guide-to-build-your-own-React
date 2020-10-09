
export function myFristSimpleRender(element, parentDom) {
    const { type, props } = element;
    const dom = document.createElement(type);

    // Set properties     
    Object.keys(props).forEach(name => {
        if (name === "style")
        dom.setAttribute("style",props[name]);
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


 
export function myFristSimpleWithChildrenRender(element, parentDom) {
    const { type, props } = element;
    const dom = document.createElement(type);

    // Set properties     
    Object.keys(props).forEach(name => {
        if (name === "style")
        dom.setAttribute("style",props[name]);
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
