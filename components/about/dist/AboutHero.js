"use strict";
exports.__esModule = true;
var react_1 = require("react");
function AboutHero() {
    return (react_1["default"].createElement("section", { className: "py-8 md:py-32" },
        react_1["default"].createElement("div", { className: "container-md" },
            react_1["default"].createElement("div", { className: " flex-col flex gap-4 md:gap-10" },
                react_1["default"].createElement("p", { className: "sec_tagline" }, "About FoReal"),
                react_1["default"].createElement("h1", { className: "text-2xl sm:text-4xl md:text-7xl font-serif font-medium" },
                    "Built by four women",
                    react_1["default"].createElement("span", { className: "block italic" }, "who saw a better way.")),
                react_1["default"].createElement("p", { className: "text-muted text-base md:text-lg max-w-xl leading-snug" }, "We're Anna, Jasmine, Rachel, and Chloe \u2014 four African American women who believed luxury fashion shouldn't be locked behind price tags. In 2026, we built FoReal to democratize access to designer pieces while creating a sustainable, circular fashion economy.")))));
}
exports["default"] = AboutHero;
