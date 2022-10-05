import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getLeaderboard() {
    const topPlayers = await this.prisma.stats.findMany({
      take: 10,
      orderBy: {
        netWins: 'desc',
      },
    });
    return topPlayers;
  }

  async getLeaderboardRank() {}
}
