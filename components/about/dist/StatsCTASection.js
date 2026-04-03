"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
function StatsCTASection() {
    return (React.createElement("section", { className: "pb-8 md:pb-32" },
        React.createElement("div", { className: "container-md" },
            React.createElement("div", { className: "border border-border bg-muted/10  px-5 md:px-10 py-8 md:py-14 text-center" },
                React.createElement("div", { className: "grid grid-cols-2 gap-6 md:gap-10 items-center" },
                    React.createElement("div", null,
                        React.createElement("h2", { className: "font-serif text-3xl md:text-5xl mb-2" }, "2026"),
                        React.createElement("p", { className: "text-xs tracking-[0.3em] uppercase text-muted font-medium" }, "Founded")),
                    React.createElement("div", null,
                        React.createElement("h2", { className: "font-serif text-3xl md:text-5xl mb-2" }, "100%"),
                        React.createElement("p", { className: "text-xs tracking-[0.3em] uppercase text-muted font-medium" }, "Woman-led"))),
                React.createElement("div", { className: "border-t border-border my-8 md:my-12" }),
                React.createElement(link_1["default"], { href: "/list-wardrobe" },
                    React.createElement("button", { className: "btn-bg" }, "List Your Wardrobe"))))));
}
exports["default"] = StatsCTASection;
