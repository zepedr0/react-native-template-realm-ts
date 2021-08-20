import Realm from 'realm';

export class Task extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  isComplete!: boolean;

  static generate(description: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      isComplete: false,
    };
  }

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      description: 'string',
      isComplete: { type: 'bool', default: false }
    }
  };
}
