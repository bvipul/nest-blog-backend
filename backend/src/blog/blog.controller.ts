import { CreatePostDTO } from './dto/create-post.dto';
import { BlogService } from './blog.service';
import { Controller, Post, Res, Body, HttpStatus, Get, Param, NotFoundException, Put, Query, Delete } from '@nestjs/common';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {  }

  @Post('/post')
  async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    const post = await this.blogService.addPost(createPostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully!',
      post
    });
  }

  @Get('post/:postID')
  async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    const post = await this.blogService.getPost(postID);

    if(!post) {
      throw new NotFoundException('Post does not exist!');
    }

    return res.status(HttpStatus.OK).json(post);
  }

  @Get()
  async getPosts(@Res() res) {
    const posts = await this.blogService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Put('/post/:postID/edit')
  async editPost(@Res() res, @Param('postID', new ValidateObjectId()) postID, @Body() createPostDTO: CreatePostDTO) {
    const updatedPost = await this.blogService.editPost(postID, createPostDTO);
    
    if(!updatedPost) {
      throw new NotFoundException('Post does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: updatedPost
    })
  }

  @Delete('/post/:postID/delete')
  async deletePost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    const deletedPost = await this.blogService.deletePost(postID);

    if(!deletedPost) {
      throw new NotFoundException('Post does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully deleted',
      post: deletedPost
    });
  }
}
