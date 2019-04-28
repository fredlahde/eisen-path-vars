import { VApp, Renderer, Component, ComponentBuildFunc, VNode, Props } from '@kloudsoftware/eisen';

class Foo extends Component {
    build(app: VApp): ComponentBuildFunc {
        return (root: VNode, props: Props) => {
            const id = props.getProp("_id");

            app.createElement("h1", id == undefined ? "UNDEF" : id, root);

            return {
                mounted: () => {
                    console.log("Mounted");
                },

                unmounted: () => {
                    console.log("unmounted");
                },

                remount: () => {
                    console.log("remounted");
                }
            }
        }
    }
}

class Bar extends Component {
    build(app: VApp): ComponentBuildFunc {
        return (root: VNode, props: Props) => {
            app.createElement("h1", "BAR", root);

            return {
                mounted: () => {
                    console.log("Mounted");
                },

                unmounted: () => {
                    console.log("unmounted");
                },

                remount: () => {
                    console.log("remounted");
                }
            }
        }
    }
}

class Baz extends Component {
    build(app: VApp): ComponentBuildFunc {
        return (root: VNode, props: Props) => {
            const id = props.getProp("_id");
            const user = props.getProp("_user");
            app.createElement("h1", "id: " + id + " user: " + user, root);

            return {
                mounted: () => {
                    console.log("Mounted");
                },

                unmounted: () => {
                    console.log("unmounted");
                },

                remount: () => {
                    console.log("remounted");
                }
            }
        }
    }
}

const renderer = new Renderer();
const app = new VApp("target", renderer);
app.init();

const rmount = app.createElement("div", "", app.rootNode);
const router = app.useRouter(rmount);
router.registerRoute("/", new Foo());
router.registerRoute("/bar", new Bar());
router.registerRoute("/foo/{id}", new Foo());
router.registerRoute("/foo/{id}/bar/{user}", new Baz());
router.resolveRoute(document.location.pathname).catch(e => console.error(e));

