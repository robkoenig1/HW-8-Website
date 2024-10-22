import html from "./main.component.html";
import css from "./main.component.css";
import { BoopButtonComponent } from "./boop-button/boop-button.component";
import { BindValue, WebzComponent } from "@boots-edu/webz";

/**
 * @description MainComponent is the main component of the app
 * @extends WebzComponent
 *
 */
export class MainComponent extends WebzComponent {
    @BindValue("example-target")
    private myText: string = "Hello from the TypeScript side!";
    private boopButton: BoopButtonComponent = new BoopButtonComponent();

    constructor() {
        super(html, css);
        this.addComponent(this.boopButton, "boop-button");
    }
}
