import {Body, Controller, Get, HttpCode, Param, Patch, Post, Request} from "@nestjs/common";
import {ApiBearerAuth, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiServiceUnavailableResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {CryptoService} from "./crypto.service";
import {CryptoPipe} from "./crypto.pipe";
import {Crypto} from '.prisma/client';
import {CryptoCurrency, UpdateEnableCrypto} from "@count-of-money/shared";
import {ResponseError} from "@count-of-money/documentation";
import {Public} from "../auth/jwt/jwt.decorator";

@Controller('crypto')
@ApiTags('Cryptocurrency')
export class CryptoController {

  constructor(private cryptoService: CryptoService) {
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

  @Public()
  @Get('public')
  public getRestrictedCrypto() {
    return this.cryptoService.getRestrictedCrypto();
  }

  @HttpCode(200)
  @Patch()
  public updateCrypto(@Request() req, @Body() body: UpdateEnableCrypto) {
    return this.cryptoService.updateCrypto(req.user, body);
  }

  @Get(':cryptoId')
  @ApiOperation({description: 'Get a specific Cryptocurrency'})
  @ApiOkResponse({description: 'Cryptocurrency', type: CryptoCurrency})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  public getCryptoInfo(@Request() req, @Param('cryptoId') cryptoId: string) {
    return this.cryptoService.getCryptoById(req.user, cryptoId);
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
