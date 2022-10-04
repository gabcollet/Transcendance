import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AchievementService {
  constructor(private prisma: PrismaService) {}

  async addAchievements(winner: string, loser: string) {
    const w_Stats = await this.prisma.stats.findUnique({
      where: {
        username: winner,
      },
    });
    const l_Stats = await this.prisma.stats.findUnique({
      where: {
        username: loser,
      },
    });
    if (w_Stats.wins === 0) {
      this.addFirstWin(winner);
    } else if (w_Stats.wins === 4) {
      this.addFirst5Wins(winner);
    } else if (w_Stats.wins === 9) {
      this.addFirst10Wins(winner);
    }
    if (w_Stats.winningStreak === 4) {
      this.addStreak5Wins(winner);
    }
    if (l_Stats.losingStreak === 4) {
      this.addStreak5Losses(loser);
    }
  }

  async addFirstWin(winner: string) {
    await this.prisma.achievements.update({
      where: {
        username: winner,
      },
      data: {
        firstWin: true,
      },
    });
  }

  async addFirst5Wins(winner: string) {
    await this.prisma.achievements.update({
      where: {
        username: winner,
      },
      data: {
        first5Wins: true,
      },
    });
  }

  async addFirst10Wins(winner: string) {
    await this.prisma.achievements.update({
      where: {
        username: winner,
      },
      data: {
        first10Wins: true,
      },
    });
  }

  async addStreak5Wins(winner: string) {
    await this.prisma.achievements.update({
      where: {
        username: winner,
      },
      data: {
        streak5Wins: true,
      },
    });
  }

  async addStreak5Losses(loser: string) {
    await this.prisma.achievements.update({
      where: {
        username: loser,
      },
      data: {
        streak5Losses: true,
      },
    });
  }
}
