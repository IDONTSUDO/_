import cron from "node-cron";

export abstract class CronController {
  //every day 6:30
  cron = "30 6 * * *";

  abstract name: string;

  abstract job(): Promise<void>;
  start() {
    cron.schedule(this.cron, async () => {
      await this.job();
    });
  }
}
