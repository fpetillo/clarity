/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {SVG_ICON_TEMPLATES} from "./svg-icon-templates";

let parentConstructor = function () {
    return HTMLElement.apply(this, arguments);
};
if (typeof Reflect === "object") {
    parentConstructor = function () {
        return (Reflect as any).construct(
            HTMLElement,
            arguments,
            this.constructor
        );
    };
}

function ClarityIcon() {
    "use strict";
    return (parentConstructor as any).apply(this, arguments);
}

(ClarityIcon as any).observedAttributes = ["shape", "size"];

ClarityIcon.prototype = Object.create(HTMLElement.prototype);
ClarityIcon.prototype.constructor = ClarityIcon;
let generateIcon = function (element: any, shape: string) {

    if (shape !== element._shape) {
        element._shape = shape;
        element.innerHTML = SVG_ICON_TEMPLATES[shape] || SVG_ICON_TEMPLATES["warning"];
    }
};
let setIconSize = function (element: any, size: string) {

    if (!Number(size) || Number(size) < 0) {

        element.style.width = null; // fallback to the original stylesheet value
        element.style.height = null; // fallback to the original stylesheet value
    } else {

        element.style.width = size + "px";
        element.style.height = size + "px";
    }

};
ClarityIcon.prototype.connectedCallback = function () {

    let host = this as HTMLElement;

    if (host.hasAttribute("shape")) {
        generateIcon(host, host.getAttribute("shape"));
    }
    if (host.hasAttribute("size")) {
        setIconSize(host, host.getAttribute("size"));
    }
};
ClarityIcon.prototype.attributeChangedCallback = function (attributeName: string, oldValue: string, newValue: string) {

    let host = this as HTMLElement;

    if (attributeName === "shape") {
        generateIcon(host, newValue);
    }
    if (attributeName === "size") {
        setIconSize(host, newValue);
    }


};

customElements.define("clr-icon", ClarityIcon);