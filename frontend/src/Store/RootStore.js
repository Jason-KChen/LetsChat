import UIStore from "./UIStore";
import ChatStore from "./ChatStore";

class RootStore {
    constructor () {
        this.uiStore = new UIStore(this)
        this.chatStore = new ChatStore(this)
    }
}

export default RootStore