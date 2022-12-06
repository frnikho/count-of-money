import {Controller, Get, HttpCode, Param, Post, Request} from "@nestjs/common";
import {ApiBearerAuth, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiServiceUnavailableResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
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
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  @ApiOperation({description: 'Get user preference crypto currencies. If user is admin, all disabled crypto currencies will be return'})
  public getCrypto() {
    // User Preference Crypto List
  }

  @Get('all')
  @HttpCode(200)
  @ApiOkResponse({description: 'Array of Cryptocurrency', type: CryptoCurrency, isArray: true})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  public getAllCrypto(@Request() req) {
    return this.cryptoService.getAllCrypto(req.user);
  }

  @Get(':cryptoId')
  @ApiOperation({description: 'Get a specific Cryptocurrency'})
  @ApiOkResponse({description: 'Cryptocurrency', type: CryptoCurrency})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  public getCryptoInfo() {
    //TODO waiting for user preference
  }

  @Post(':cryptoId/toggle')
  @HttpCode(200)
  @ApiOkResponse({description: 'Cryptocurrency', type: CryptoCurrency})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  public toggleCrypto(@Request() req, @Param('cryptoId', CryptoPipe) crypto: Crypto) {
    return this.cryptoService.toggleCrypto(req.user, crypto, !crypto.enable);
  }

  @Post(':cryptoId/enable')
  @HttpCode(200)
  @ApiOkResponse({description: 'Cryptocurrency', type: CryptoCurrency})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  public enableCrypto(@Request() req, @Param('cryptoId', CryptoPipe) crypto: Crypto) {
    return this.cryptoService.toggleCrypto(req.user, crypto, true);
  }

  @Post(':cryptoId/disable')
  @HttpCode(200)
  @ApiOkResponse({description: 'Cryptocurrency', type: CryptoCurrency})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  public disableCrypto(@Request() req, @Param('cryptoId', CryptoPipe) crypto: Crypto) {
    return this.cryptoService.toggleCrypto(req.user, crypto, false);
  }

}
