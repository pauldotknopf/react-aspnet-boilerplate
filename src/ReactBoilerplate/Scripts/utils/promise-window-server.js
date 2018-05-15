export default class PromiseWindow {
  // eslint-disable-next-line class-methods-use-this
  open() {
    throw new Error('you can not run this on the server, ding-dong.');
  }
}
