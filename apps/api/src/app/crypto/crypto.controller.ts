import {Controller, Get, HttpCode, Param, Post, Request} from "@nestjs/common";
import {ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {CryptoService} from "./crypto.service";
import {CryptoPipe} from "./crypto.pipe";
import {Crypto} from '.prisma/client';
import {CryptoCurrency} from "@count-of-money/shared";
import {ResponseError} from "@count-of-money/documentation";

@Controller('crypto')
@ApiTags('Cryptocurrency')
export class CryptoController {

  constructor(private cryptoService: CryptoService) {
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({description: 'Array of Cryptocurrency', type: CryptoCurrency, isArray: true})
  @ApiForbiddenResponse({description: '', type: ResponseError})
  @ApiUnauthorizedResponse({description: '', type: ResponseError})
  @ApiBearerAuth()
  @ApiOperation({description: 'Get user preference crypto currencies. If user is admin, all disabled crypto currencies will be return'})
  public getCrypto() {
    // User Preference Crypto List
  }

  @Get('all')
  @HttpCode(200)
  @ApiOkResponse({description: 'Array of Cryptocurrency', type: CryptoCurrency, isArray: true})
  @ApiForbiddenResponse({description: '', type: ResponseError})
  @ApiUnauthorizedResponse({description: '', type: ResponseError})
  @ApiOperation({description: 'Get all Crypto currencies'})
  @ApiBearerAuth()
  public getAllCrypto(@Request() req) {
    return this.cryptoService.getAllCrypto(req.user);
  }

  @Get(':cryptoId')
  @ApiOperation({description: 'Get a specific Cryptocurrency'})
  @ApiOkResponse({description: 'Cryptocurrency', type: CryptoCurrency})
  @ApiForbiddenResponse({description: '', type: ResponseError})
  @ApiUnauthorizedResponse({description: '', type: ResponseError})
  @ApiBearerAuth()
  public getCryptoInfo() {
    //TODO waiting for user preference
  }

  @Get(':cryptoId/history')
  public getCryptoHistory() {
    //TODO build history schema
  }

  @Post(':cryptoId/toggle')
  @HttpCode(200)
  public toggleCrypto(@Request() req, @Param('cryptoId', CryptoPipe) crypto: Crypto) {
    return this.cryptoService.toggleCrypto(req.user, crypto, !crypto.enable);
  }

  @Post(':cryptoId/enable')
  @HttpCode(200)
  public enableCrypto(@Request() req, @Param('cryptoId', CryptoPipe) crypto: Crypto) {
    return this.cryptoService.toggleCrypto(req.user, crypto, true);
  }

  @Post(':cryptoId/disable')
  @HttpCode(200)
  public disableCrypto(@Request() req, @Param('cryptoId', CryptoPipe) crypto: Crypto) {
    return this.cryptoService.toggleCrypto(req.user, crypto, false);
  }

}
