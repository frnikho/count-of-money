import {Body, Controller, Delete, Get, Param, Patch, Post, Request} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {PreferenceService} from "./preference.service";
import {CreateCryptoListBody, UpdateCryptoListBody} from "@count-of-money/shared";
import {CryptoList} from '.prisma/client';
import {CryptoListPipe} from "./cryptolist.pipe";


@ApiTags('User')
@Controller('user/preference')
export class PreferenceController {

  constructor(private service: PreferenceService) {
  }

  @Get('crypto/list')
  public getCryptLists(@Request() req) {
    return this.service.getCryptoList(req.user);
  }

  @Get('crypto/list/:id')
  public getCrypto(@Request() req, @Param('id', CryptoListPipe) crypto: CryptoList) {
    return this.service.getCrypto(req.user, crypto);
  }

  @Post('crypto/list')
  public createCryptoList(@Request() req, @Body() body: CreateCryptoListBody) {
    return this.service.createCryptoList(req.user, body);
  }

  @Patch('crypto/list/:id')
  public updateCryptoList(@Request() req, @Param('id', CryptoListPipe) crypto: CryptoList, @Body() body: UpdateCryptoListBody) {
    return this.service.updateCryptoList(req.user, crypto, body);
  }

  @Delete('crypto/list/:id')
  public deleteCryptoList(@Request() req, @Param('id', CryptoListPipe) crypto: CryptoList) {
    return this.service.deleteCryptoList(req.user, crypto);
  }

}
