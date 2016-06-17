export default class PromiseWindow {
  open() {
    throw new Error('you can not run this on the server, ding-dong.');
  }
}
