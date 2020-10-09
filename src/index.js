import { render } from "./Didact";
import { myFristSimpleRender, myFristSimpleWithChildrenRender } from "./MyDidact"

const stories = [
    { name: "Didact introduction", url: "http://bit.ly/2pX7HNn" },
    { name: "Rendering DOM elements ", url: "http://bit.ly/2qCOejH" },
    { name: "Element creation and JSX", url: "http://bit.ly/2qGbw8S" },
    { name: "Instances and reconciliation", url: "http://bit.ly/2q4A746" },
    { name: "Components and state", url: "http://bit.ly/2rE16nh" }
];


/*
We will use plain JS objects to describe what needs to be rendered.
 We’ll call them Didact Elements. These elements have two required properties: type and props.
  type can be a string or a function, but we will use only strings until we 
  introduce components on a later post. props is an object that 
  could be empty (but not null). props may have a children property, 
  which should be an array of Didact Elements
 */

/*
Didact elements are pretty similar to React elements. But usually 
you don’t create React elements as JS objects when using React, you probably
 use JSX or even createElement. We will do the same in Didact, 
but we are leaving the element creation code for the next post in the series.
*/

const appSimpleElement = {
    type: "div",
    props: {
        className: "my-class",
        style: "background-color: red;border: 1px solid;width: 100px;height: 10px;",
        onClick: (e) => console.log('clicked ==> ' + e)
    }
};

// myFristSimpleRender(appSimpleElement, document.getElementById("root"));

const appSimpleWithChildrenElement = {
    type: "div",
    props: {
        children: [
            {
                type: "div",
                props: {
                    className: "my-class-1",
                    style: "background-color: red;border: 1px solid;width: 100px;height: 10px;",
                    onClick: (e) => console.log('clicked ==> ' + e)
                },
                type: "div",
                props: {
                    className: "my-class-2",
                    style: "background-color: green;border: 1px solid;width: 100px;height: 10px;",
                    onClick: (e) => console.log('clicked ==> ' + e)
                }
            }
        ]
    }
}

myFristSimpleWithChildrenRender(appSimpleWithChildrenElement, document.getElementById("root"));

const appElement = {
    type: "div",
    props: {
        children: [
            {
                type: "ul",
                props: {
                    children: stories.map(storyElement)
                }
            }
        ]
    }
};

function storyElement({ name, url }) {
    const likes = Math.ceil(Math.random() * 100);
    const buttonElement = {
        type: "button",
        props: {
            children: [
                { type: "TEXT ELEMENT", props: { nodeValue: likes } },
                { type: "TEXT ELEMENT", props: { nodeValue: "❤️" } }
            ]
        }
    };
    const linkElement = {
        type: "a",
        props: {
            href: url,
            children: [{ type: "TEXT ELEMENT", props: { nodeValue: name } }]
        }
    };

    return {
        type: "li",
        props: {
            children: [buttonElement, linkElement]
        }
    };
}
