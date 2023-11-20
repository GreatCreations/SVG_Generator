// To create 1000 SVGs, run 'node SVG_Generator.mjs 1000 name_svg' in the terminal

import fs from 'fs';
import { SVG, registerWindow } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import { optimize } from 'svgo'; // Import SVGO for optimization

// Read command line arguments
const args = process.argv.slice(2);
const runCount = parseInt(args[0], 10);
const baseFilename = args[1];

// Setting up the SVG window and document
const window = createSVGWindow();
const document = window.document;
registerWindow(window, document);

// Define the path to your original SVG file
const originalSvgPath = './GCLogo.svg';
let originalSvg = '';
try {
originalSvg = fs.readFileSync(originalSvgPath, 'utf8');
} catch (error) {
console.error("Error reading the original SVG file: ", error);
process.exit(1); // Exit if the file can't be read
}

// Function to optimize SVG content using SVGO
function optimizeSvg(svgContent) {
console.log("Calling optimizeSvg function");

console.log('Original Size:', svgContent.length);

const result = optimize(svgContent, {
multipass: true,
plugins: [
'removeDoctype',
'removeComments',
'cleanupAttrs'
]
});

console.log('Optimized Size:', result.data.length);

return result.data;
}

// Function to generate a random color
const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

// Function to generate random opacity between 40% and 100%
const randomOpacity = () => 0.4 + Math.random() * 0.6;

// Function to create a linear gradient
const createGradient = (container) => {
const gradient = container.gradient('linear', (add) => {
add.stop(0, randomColor());
add.stop(1, randomColor());
});
return gradient;
};

// Functions to create various patterns
const createPattern = (container) => {
const pattern = container.pattern(20, 20, (add) => {
add.rect(20, 20).fill(randomColor());
add.circle(10).fill(randomColor());
});
return pattern;
};

const createStripePattern = (container) => {
const pattern = container.pattern(40, 40, (add) => {
add.rect(40, 40).fill(randomColor());
add.line(0, 20, 40, 20).stroke({ color: randomColor(), width: 5 });
});
return pattern;
};

const createWavePattern = (container) => {
const pattern = container.pattern(60, 60, (add) => {
add.rect(60, 60).fill(randomColor());
add.path('M 0 30 Q 30 60 60 30 T 120 30').fill('none').stroke({ color: randomColor(), width: 4 });
});
return pattern;
};

// Function to add SVG animations
const addSvgAnimation = (element, type) => {
switch (type) {
case 'scale':
element.animate({ duration: 5000, when: 'now', swing: true })
.scale(0.5 + Math.random());
break;
case 'rotate':
element.animate({ duration: 5000, when: 'now', swing: true })
.rotate(Math.random() * 360);
break;
case 'colorChange':
element.animate({ duration: 5000, when: 'now', swing: true })
.attr({ fill: randomColor() });
break;
// Add more animation types as needed
}
};

const addColorChangeAnimation = (element) => {
const animate = element.element('animate');
animate.attr({
attributeName: 'fill',
values: `${randomColor()};${randomColor()};${randomColor()}`,
dur: '5s',
repeatCount: 'indefinite'
});
};

// Function to generate a random pivot point
const randomPivot = () => {
    const xPivot = Math.floor(Math.random() * 100); // Random value between 0 and 100
    const yPivot = Math.floor(Math.random() * 100); // Random value between 0 and 100
    return `${xPivot}% ${yPivot}%`;
};


// Add scale animation with random pivot
const addScaleAnimation = (element) => {
    const pivot = randomPivot();
    element.style('transform-origin', pivot); // Set the pivot point
    const animate = element.element('animateTransform');
    animate.attr({
        attributeName: 'transform',
        attributeType: 'XML',
        type: 'scale',
        values: '1;1.5;1', // Scale from 1 to 1.5 and back to 1
        dur: '5s',
        repeatCount: 'indefinite'
    });
};

// Add rotate animation with random pivot
const addRotateAnimation = (element) => {
    const pivot = randomPivot();
    element.style('transform-origin', pivot); // Set the pivot point
    const animate = element.element('animateTransform');
    animate.attr({
        attributeName: 'transform',
        attributeType: 'XML',
        type: 'rotate',
        from: '0',
        to: '360',
        dur: '5s',
        repeatCount: 'indefinite'
    });
};

const addOpacityAnimation = (element) => {
const animate = element.element('animate');
animate.attr({
attributeName: 'opacity',
values: '0;1;0', // Opacity from 0 to 1 and back to 0
dur: '5s',
repeatCount: 'indefinite'
});
};

const addStrokeWidthAnimation = (element) => {
const animate = element.element('animate');
animate.attr({
attributeName: 'stroke-width',
values: '1;10;1', // Stroke width from 1 to 10 and back to 1
dur: '5s',
repeatCount: 'indefinite'
});
};

const addEllipsePathAnimation = (element) => {
const animateRx = element.element('animate');
animateRx.attr({
attributeName: 'rx',
values: '10;50;10', // Radius x from 10 to 50 and back to 10
dur: '5s',
repeatCount: 'indefinite'
});

const animateRy = element.element('animate');
animateRy.attr({
attributeName: 'ry',
values: '50;10;50', // Radius y from 50 to 10 and back to 50
dur: '5s',
repeatCount: 'indefinite'
});
};

const addMovementAnimation = (element) => {
const animateX = element.element('animate');
animateX.attr({
attributeName: 'x',
values: '50;100;50', // Move x from 50 to 100 and back to 50
dur: '5s',
repeatCount: 'indefinite'
});

const animateY = element.element('animate');
animateY.attr({
attributeName: 'y',
values: '50;100;50', // Move y from 50 to 100 and back to 50
dur: '5s',
repeatCount: 'indefinite'
});
};



const randomFill = (container) => {
const fills = [randomColor, () => createGradient(container), () => createPattern(container), () => createStripePattern(container), () => createWavePattern(container)];
return fills[Math.floor(Math.random() * fills.length)]();
};

// Define shape creators
const shapeCreators = {
'circle': (container) => {
const circle = container.circle(Math.random() * 100).fill(randomFill(container));
circle.opacity(randomOpacity());
if (Math.random() > 0.5) {
addScaleAnimation(circle);
} else {
addRotateAnimation(circle);
}
return circle;
},
'rect': (container) => {
const rect = container.rect(Math.random() * 150, Math.random() * 100).fill(randomFill(container));
rect.opacity(randomOpacity());
addScaleAnimation(rect); // Apply scale animation
return rect;
},

'hexagon': (container) => {
const hexagon = container.polygon('50,0 100,25 100,75 50,100 0,75 0,25').fill(randomFill(container));
hexagon.opacity(randomOpacity());
if (Math.random() > 0.5) {
addSvgAnimation(hexagon, 'colorChange');
}
return hexagon;
},
'line': (container) => {
const line = container.line(0, 0, Math.random() * 800, Math.random() * 800).stroke({ color: randomColor(), width: Math.random() * 10 });
line.opacity(randomOpacity());
addStrokeWidthAnimation(line); // Apply stroke width animation
return line;
},

'triangle': (container) => {
const triangle = container.polygon('50,15 100,100 0,100').fill(randomFill(container));
triangle.opacity(randomOpacity());
if (Math.random() > 0.5) {
addOpacityAnimation(triangle); // Apply opacity animation
} else {
// Apply other animations or leave it static
}
return triangle;
},

'ellipse': (container) => {
const ellipse = container.ellipse(Math.random() * 150, Math.random() * 100).fill(randomFill(container));
ellipse.opacity(randomOpacity());
if (Math.random() > 0.5) {
addEllipsePathAnimation(ellipse);
}
return ellipse;
}
};

// Function to generate a random SVG
const generateRandomSvg = () => {
const canvas = SVG(document.documentElement);
canvas.svg(originalSvg);

const shapeTypes = Object.keys(shapeCreators);
const numberOfShapes = Math.floor(Math.random() * 8) + 8; // Between 8 and 16 shapes

for (let i = 0; i < numberOfShapes; i++) {
const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
const shape = shapeCreators[shapeType](canvas);
shape.move(Math.random() * 800, Math.random() * 800);
}

return canvas.svg();
};

// Generate and save SVGs based on command line input
console.log(`Starting SVG generation for ${runCount} files`); // Log before starting the loop

for (let i = 1; i <= runCount; i++) {
console.log(`Processing SVG #${i}`); // Log at the start of each iteration

try {
const formattedNumber = String(i).padStart(9, '0');
const filename = `${baseFilename}_${formattedNumber}.svg`;
const svgContent = generateRandomSvg();

const optimizedSvgContent = optimizeSvg(svgContent);

fs.writeFileSync(`./SVGs/${filename}`, optimizedSvgContent);
} catch (error) {
console.error(`Error processing SVG #${i}:`, error);
}
}

console.log(`Generated ${runCount} SVG(s) with base filename '${baseFilename}'`); // Final log statement


