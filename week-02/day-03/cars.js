const car = {
    maker: 'Fiat',
    year: '1999',
    start: function() {
        console.log('Car started!');
    },
    stop: function() {
        console.log('Car stopped');
    },
    moveForward: function() {
        console.log('Moving forward...');
    }
};

car.start();
car.moveForward();
car.stop();