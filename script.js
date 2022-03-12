const commentsInner = document.querySelector('.comments-inner');
const commentInput = document.getElementById('comment');
const nameInput = document.getElementById('name');
const iconColor = document.querySelector('input[type="color"]');
const iconPreview = document.querySelector('.profile-pic-preview');
const form = document.querySelector('form');

const updatePreview = () => iconPreview.style.backgroundColor = iconColor.value;

iconColor.addEventListener('input', updatePreview);

let isReply;

form.addEventListener('submit', e => {
  e.preventDefault();
  let parent = isReply ? replyToComment() : 
  addComment();
})

const addComment = parent => {
  parent.appendChild(newComment());
  commentInput.value = '';
}

let replyingTo;

const newComment = () => {
  const commentContainer = document.createElement('div');
  const commentData = commentContainer.dataset;
  
    const toTwelveHour = time => {
    const longStringTime = time.toTimeString();
    let hours = longStringTime.slice(0,2);
    let minutes = longStringTime.slice(3,5);
    let abbr;
    if (parseInt(hours) >= 12) {
      abbr = "pm";
      if (hours > 12) {
        hours = parseInt(hours) - 12;
      }
    } else abbr = "am";
    return `${hours}:${minutes} ${abbr}`;
  }
  
  commentContainer.classList.add('comment-container');
  commentData.id = Date.now();
  commentData.commenter = nameInput.value ? nameInput.value : 'Anonymous User';
  commentData.color = iconColor.value;
  commentData.commentContent = commentInput.value;
  commentData.likes = 0;
  commentData.dislikes = 0;
  commentData.date = new Date().toDateString().slice(4);
  commentData.time = toTwelveHour(new Date());
  commentData.replies = JSON.stringify({replies:0,ids:[]});
  commentData.isReply = JSON.stringify({isReply,replyingTo:null});
  
  const commentUpper = document.createElement('div');
  commentUpper.classList.add('comment-upper');
  const commentMenuButton = document.createElement('div');
  commentMenuButton.classList.add('comment-menu-button');
  const commentMenu = document.createElement('ul');
  commentMenu.classList.add('comment-menu');
  const reportCommentButton = document.createElement('li');
  reportCommentButton.textContent = 'Report comment';
  const hideCommentButton = document.createElement('li');
  hideCommentButton.textContent = 'Hide comment';
  const profilePic = document.createElement('div');
  profilePic.classList.add('profile-pic');
  profilePic.title = commentData.commenter;
  profilePic.style.backgroundColor = commentData.color;
  profilePic.style.borderColor = commentData.color;
  const commenterName = document.createElement('span');
  commenterName.classList.add('commenter-name');
  commenterName.textContent = commentData.commenter;
  
  const commentContent = document.createElement('div');
  commentContent.classList.add('comment-content');
  commentContent.textContent = commentData.commentContent;
  
  const commentLower = document.createElement('div');
  commentLower.classList.add('comment-lower');
  const commentDateTime = document.createElement('div');
  commentDateTime.classList.add('comment-date-time');
  const commentDate = document.createElement('span');
  commentDate.classList.add('comment-date');
  commentDate.textContent = commentData.date;
  const at = document.createTextNode(' at ');
  const commentTime = document.createElement('span');
  commentTime.classList.add('comment-time');
  commentTime.textContent = commentData.time;
  const commentInteractions = document.createElement('div');
  commentInteractions.classList.add('comment-interactions');
  const likeContainer = document.createElement('span');
  const likeButton = document.createElement('button');
  likeButton.classList.add('like');
  likeButton.textContent = '👍';
  const likeCount = document.createElement('span');
  likeCount.classList.add('like-count');
  likeCount.textContent = commentData.likes;
  const dislikeContainer = document.createElement('span');
  const dislikeButton = document.createElement('button');
  dislikeButton.classList.add('dislike');
  dislikeButton.textContent = '👎';
  const dislikeCount = document.createElement('span');
  dislikeCount.classList.add('dislike-count');
  dislikeCount.textContent = commentData.dislikes;
  const replyButtonContainer = document.createElement('span');
  const replyButton = document.createElement('button');
  replyButton.classList.add('reply');
  replyButton.textContent = '💬';
  const replyLabel = document.createElement('span');
  replyLabel.textContent = 'Reply';
  
  likeContainer.appendChild(likeButton);
  likeContainer.appendChild(likeCount);
  dislikeContainer.appendChild(dislikeButton);
  dislikeContainer.appendChild(dislikeCount);
  replyButtonContainer.appendChild(replyButton);
  replyButtonContainer.appendChild(replyLabel);
  commentInteractions.appendChild(likeContainer);
  commentInteractions.appendChild(dislikeContainer);
  commentInteractions.appendChild(replyButtonContainer);
  commentDateTime.appendChild(commentDate);
  commentDateTime.appendChild(at);
  commentDateTime.appendChild(commentTime);
  commentLower.appendChild(commentDateTime);
  commentLower.appendChild(commentInteractions);
  commentMenu.appendChild(reportCommentButton);
  commentMenu.appendChild(hideCommentButton);
  commentMenuButton.appendChild(commentMenu);
  commentUpper.appendChild(profilePic);
  commentUpper.appendChild(commenterName);
  commentUpper.appendChild(commentMenuButton);
  commentContainer.appendChild(commentUpper);
  commentContainer.appendChild(commentContent);
  commentContainer.appendChild(commentLower);
  
  console.log('submitted');
  
  return commentContainer;
}

const replyingMessage = document.querySelector('.replying-message');
const cancelReplyButton = replyingMessage.querySelector('.cancel-reply'); 

const replyToComment = e => {
  let parentComment = e.target.parentNode.parentNode.parentNode.parentNode;
  const parentUser = parentComment.dataset.commenter;
  
  isReply = true;
  replyingTo = parentComment.dataset.id;
  replyingMessage.style.display = 'flex';
  replyingMessage.querySelector('.parent-user').textContent = parentUser;

  cancelReplyButton.addEventListener('click', e => {
    e.preventDefault();
    cancelReply(e);
  })

  const cancelReply = e => {
    e.preventDefault();
    isReply = false;
    replyingTo = null;
    replyingMessage.style.display = 'none';
  }

  return parentComment;

}

const replyButtons = document.querySelectorAll('.reply');
replyButtons.forEach(a => a.addEventListener('click', replyToComment))