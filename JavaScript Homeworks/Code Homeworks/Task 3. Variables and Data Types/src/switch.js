const command = 'help';

console.log(`\nCurrent Command: ${command}`);

switch (command) {
    case 'help':
        console.log('You may find details here: https://help.com/.');
        break;
    case 'start':
        console.log('Program is running...');
        break;
    case 'stop':
        console.log('Program is stopping...');
        break;
    case 'pause':
        console.log('Program is paused.');
        break;
    default:
        console.log('Unknown command. Please, try again!');
}
