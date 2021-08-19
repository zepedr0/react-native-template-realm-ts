import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, SafeAreaView, FlatList, Linking } from 'react-native';

interface Task {
  id: string,
  description: string,
  isComplete: boolean
}

const App = () => {
  const [text, setText] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (text === '')
      return;

    setTasks([...tasks, { id: `${tasks.length}`, description: text, isComplete: false }]);
    setText('');
  }

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((task) => task.id === id
      ? { id, description: task.description, isComplete: !task.isComplete }
      : task
    ));
  }

  const handleDeleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.form}>
        <TextInput style={styles.textInput} placeholder="Task name to add" onChangeText={setText} value={text} autoCorrect={false} />
        <Pressable style={styles.submit} onPress={handleAddTask}>
          <Text style={styles.icon}>
            ＋
          </Text>
        </Pressable>
      </View>
      {tasks.length === 0 ? (
        <View style={styles.content}>
          <Text style={styles.paragraph}>
            Welcome to the Realm React Native TypeScript Template
          </Text>
          <Text style={styles.paragraph}>
            Start adding a task at the form on top of the screen to see how they are created in Realm and update the UI. You can also change a task status or remove it from the tasks list.
          </Text>
          <Text style={styles.paragraph}>
            You can find more information about the React Native Realm SDK in:
          </Text>
          <Pressable onPress={() => Linking.openURL('https://docs.mongodb.com/realm/sdk/react-native/')}>
            <Text style={[styles.paragraph, styles.link]}>
              docs.mongodb.com/realm/sdk/react-native
            </Text>
          </Pressable>
        </View>) :
        (<View style={styles.content}>
          <FlatList
            style={styles.flatList}
            data={tasks}
            keyExtractor={task => task.id}
            renderItem={({ item }) => (
              <View style={styles.task}>
                <Pressable style={[styles.taskStatus, item.isComplete && styles.completedStatus]} onPress={() => handleToggleTask(item.id)}>
                  <Text style={[styles.icon, item.isComplete && styles.checkmark]}>
                    {item.isComplete ? '✓' : '-'}
                  </Text>
                </Pressable>
                <View style={styles.taskDescriptionContainer}>
                  <Text style={styles.taskDescription} numberOfLines={1} >
                    {item.description}
                  </Text>
                </View>
                <Pressable style={styles.deleteButton} onPress={() => handleDeleteTask(item.id)}>
                  <Text style={styles.deleteText}>
                    Delete
                  </Text>
                </Pressable>
              </View>
            )}
          />
        </View>)
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#2A3642'
  },
  form: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.7,
    shadowRadius: 3
  },
  textInput: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    fontSize: 15,
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    borderRadius: 5,
    backgroundColor: '#6E60F9',
    width: 50,
    height: 50
  },
  icon: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  flatList: {
    marginTop: 20
  },
  paragraph: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10
  },
  link: {
    color: '#6E60F9',
    fontWeight: 'bold'
  },
  task: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 7,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.7,
    shadowRadius: 3
  },
  taskDescriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  taskDescription: {
    color: '#000000',
    fontSize: 15,
    paddingHorizontal: 10
  },
  taskStatus: {
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: '#B5B5B5',
    width: 50,
    height: 50
  },
  completedStatus: {
    backgroundColor: '#6E60F9'
  },
  deleteButton: {
    justifyContent: 'center',
  },
  deleteText: {
    color: '#B5B5B5',
    marginHorizontal: 10,
    fontSize: 15
  },
  checkmark: {
    fontSize: 15
  }
});

export default App;
