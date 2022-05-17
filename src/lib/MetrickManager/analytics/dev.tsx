export function init(code: string, options?: Object) {
    console.log(
        `Analytics init triggered for ${code} ${
            options ? `with ${JSON.stringify(options)}` : ""
        }, `
    );
}

export function pageview() {
    console.log(`Pageview triggered for ${window.location.pathname}`);
}

export function reachGoal(...args: any) {
    console.log("Goal reached:", ...args);
}
