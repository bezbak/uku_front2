import { Component, createElement } from "react";
import * as prodLytics from "./analytics/prod";
import * as devLytics from "./analytics/dev";

function isLocal(host: string) {
    return location.hostname === host;
}

function isDev() {
    return process.env.NODE_ENV !== "production";
}

export default (
    code: string,
    Router: any,
    { localhost = "localhost" } = {},
    options?: Object
) => {
    return (Page: any) => {
        class WithAnalytics extends Component {
            state = {
                analytics: undefined,
            };

            componentDidMount() {
                // check if it should track
                const shouldNotTrack = isLocal(localhost) || isDev();
                // check if it should use production or dev analytics
                const analytics = shouldNotTrack ? devLytics : prodLytics;

                // init analytics
                analytics.init(code, options);
                // log page
                analytics.pageview();

                // save possible previously defined callback
                const previousCallback = Router.onRouteChangeComplete;
                Router.onRouteChangeComplete = () => {
                    // call previously defined callback if is a function
                    if (typeof previousCallback === "function") {
                        previousCallback();
                    }
                    // log page
                    analytics.pageview();
                };

                this.setState({
                    analytics,
                });
            }

            render() {
                return createElement(Page, {
                    ...this.props,
                    analytics: this.state.analytics,
                });
            }
        }

        if (Page.getInitialProps) {
            (WithAnalytics as any).getInitialProps = Page.getInitialProps;
        }

        return WithAnalytics;
    };
};
