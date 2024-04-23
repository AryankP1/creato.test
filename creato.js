class TaskQueue {
    constructor(concurrency) {
      this.concurrency = concurrency;
      this.queue = [];
      this.running = 0;
    }
  
    push(task) {
      this.queue.push(task);
      this.next();
    }
  
    next() {
      while (this.running < this.concurrency && this.queue.length) {
        const task = this.queue.shift();
        task(() => {
          this.running--;
          this.next();
        });
        this.running++;
      }
    }
  }
  
  // Usage:
  const queue = new TaskQueue(100);
  for (let i = 0; i < 500; i++) {
    queue.push((cb) => {
      console.log(`Running task #${i}`);
      setTimeout(cb, 5000); // Each task takes 5 seconds
    });
  }
  
