type ClassName = string;
export interface Key {
  name: string;
  type: (value: any) => any;
  default?: any;
  nullable: boolean;
}

export class KeyStorage {
  private static definitions: Map<ClassName, Key[]> = new Map<ClassName, Key[]>();

  static add(className: ClassName, key: Key): void {
    if (!this.definitions.has(className)) this.definitions.set(className, []);
    const keyGroup: Key[] = this.definitions.get(className);
    keyGroup.push(key);
  }

  static find(className: ClassName): Key[] {
    return this.definitions.get(className);
  }
}
