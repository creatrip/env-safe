export class Process {
  static kill(reasons: string[]): void {
    for (const reason of reasons) {
      console.error(reason);
    }
    process.exit(1);
  }
}
