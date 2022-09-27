import { Controller, Post } from '@nestjs/common';

@Controller('pong')
export class PongController {

    @Post('winner')
    sendWinner() {
        
    }
}

