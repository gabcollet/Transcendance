import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getLeaderboard() {
    const topPlayers = await this.prisma.stats.findMany({
      take: 10,
      orderBy: {
        rank: 'asc',
      },
    });
    return topPlayers;
  }

  async updateRank() {
    const orderedPlayers = await this.prisma.stats.findMany({
      orderBy: {
        netWins: 'desc',
      },
      select: {
        username: true,
      },
    });
    for (let i = 0; i < orderedPlayers.length; i++) {
      await this.prisma.stats.update({
        where: {
          username: orderedPlayers[i].username,
        },
        data: {
          rank: i + 1,
        },
      });
    }
  }

  async getProfilePlayer(username: string) {
    const profilePlayer = this.prisma.stats.findUnique({
      where: {
        username: username,
      },
    });
    return profilePlayer;
  }

  async getStatsPlayer(username: string) {
    return this.prisma.stats.findUnique({
      where: {
        username: username,
      },
    });
  }
}
