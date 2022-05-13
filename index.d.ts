declare module "next-ym" {
    import { NextRouter } from "next/router";
    function withYM(account: string, router: NextRouter): any;
    export = withYM;
}
