const cron = require('node-cron');
const { Op } = require('sequelize');
const Post = require('../models/Post');

// Schedule the task to run every minute
cron.schedule('* * * * *', async () => {
  console.log('Running the scheduled task to post content');
  try {
    const posts = await Post.findAll({
      where: {
        scheduledAt: {
          [Op.lte]: new Date(),  // Ensure Op and new Date() are defined properly
        },
        status: 'scheduled'
      }
    });

    console.log(`Found ${posts.length} scheduled posts to process`);

    for (const post of posts) {
      // Post the content to the social media platform
      // This is a placeholder for the actual posting logic
      post.status = 'posted';
      await post.save();
      console.log(`Post with ID ${post.id} has been posted`);
    }
  } catch (error) {
    console.error('Error processing scheduled posts:', error);
  }
});
