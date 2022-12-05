import {Body, Controller, Delete, Get, Param, Patch, Post, Request} from "@nestjs/common";
import {SourceService} from "./source.service";
import {SourcePipe} from "./source.pipe";
import {AddSourceBody, Source, UpdateSourceBody} from "@count-of-money/shared";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";

@Controller('admin/source')
@ApiTags('Admin')
export class SourceController {

  constructor(private sourceService: SourceService) {
  }

  @Get()
  @ApiOkResponse({description: 'Getting all articles sources', type: Source, isArray: true})
  public getAllSources(@Request() req) {
    return this.sourceService.getAllSources(req.user);
  }

  @Get(':id')
  @ApiOkResponse({description: 'Getting a specific article source', type: Source})
  public getSource(@Request() req, @Param('id', SourcePipe) source: Source) {
    return this.sourceService.getSource(req.user, source);
  }

  @Post()
  @ApiCreatedResponse({description: 'New article source added !', type: Source})
  public addSource(@Request() req, @Body() body: AddSourceBody) {
    return this.sourceService.createSource(req.user, body);
  }

  @Delete()
  @ApiOkResponse({description: 'all sources has been deleted !', type: Source})
  public deleteAllSource(@Request() req) {
    return this.sourceService.deleteAllSource(req.user);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'A specific source has been deleted !', type: Source})
  public deleteSource(@Request() req, @Param('id', SourcePipe) source: Source) {
    return this.sourceService.deleteSource(req.user, source);
  }

  @Patch(':id')
  @ApiOkResponse({description: 'A specific sources has been updated !', type: Source})
  public updateSource(@Request() req, @Param('id', SourcePipe) source: Source, @Body() body: UpdateSourceBody) {
    return this.sourceService.updateSource(req.user, source, body);
  }

}
