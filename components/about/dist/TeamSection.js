"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
function TeamSection() {
    var slides = [
        {
            img: "/assets/images/team3.jpeg",
            name: "Anna Lerus",
            role: "Product & Strategy Lead",
            desc: "Growing up in Atlanta, Anna watched her mother meticulously care for designer pieces that rarely saw daylight. She realized that luxury fashion was sitting idle in closets worldwide while others couldn't access it. With a background in product strategy at tech startups, Anna envisioned a platform that could unlock this dormant value. She shapes FoReal's product vision and strategic direction, ensuring every feature serves the mission of democratizing luxury fashion."
        },
        {
            img: "/assets/images/team2.jpeg",
            name: "John Carter",
            role: "Creative Director",
            desc: "Growing up in Atlanta, Anna watched her mother meticulously care for designer pieces that rarely saw daylight. She realized that luxury fashion was sitting idle in closets worldwide while others couldn't access it. With a background in product strategy at tech startups, Anna envisioned a platform that could unlock this dormant value. She shapes FoReal's product vision and strategic direction, ensuring every feature serves the mission of democratizing luxury fashion."
        },
        {
            img: "/assets/images/team1.jpeg",
            name: "Emily Stone",
            role: "Marketing Lead",
            desc: "Growing up in Atlanta, Anna watched her mother meticulously care for designer pieces that rarely saw daylight. She realized that luxury fashion was sitting idle in closets worldwide while others couldn't access it. With a background in product strategy at tech startups, Anna envisioned a platform that could unlock this dormant value. She shapes FoReal's product vision and strategic direction, ensuring every feature serves the mission of democratizing luxury fashion."
        },
    ];
    var _a = react_1.useState(0), current = _a[0], setCurrent = _a[1];
    return (React.createElement("section", { className: "py-8 md:py-16" },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "grid md:grid-cols-2 gap-6 md:gap-12 items-center" },
                React.createElement("div", { className: "relative w-full h-80 sm:h-100 md:h-140 overflow-hidden" },
                    React.createElement(image_1["default"], { src: slides[current].img, alt: slides[current].name, fill: true, className: "object-cover transition duration-500" })),
                React.createElement("div", { className: "max-w-xl" },
                    React.createElement("h2", { className: " text-3xl md:text-5xl mb-2 md:mb-4 montserrat" }, slides[current].name),
                    React.createElement("p", { className: "text-muted mb-6 text-sm md:text-base font-medium" }, slides[current].role),
                    React.createElement("p", { className: "text-muted leading-relaxed text-sm md:text-base mb-4 md:mb-8 " }, slides[current].desc),
                    React.createElement("div", { className: "flex gap-3" }, slides.map(function (_, i) { return (React.createElement("button", { key: i, onClick: function () { return setCurrent(i); }, className: "h-2  transition-all duration-300 cursor-pointer " + (current === i ? "w-10 bg-[#122B2BCC]" : "w-2 bg-muted/20") })); })))))));
}
exports["default"] = TeamSection;
