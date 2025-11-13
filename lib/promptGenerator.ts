/**
 * 根据晨读文字内容生成艺术化的图片提示词
 */
export function generatePromptFromText(text: string): string {
  // 提取文字中的情感和主题关键词
  const keywords = extractKeywords(text);

  // 基础艺术风格
  const baseStyle = "唯美意境，温暖光线，柔和色调，电影级画质，高清8K";

  // 根据关键词匹配场景
  const scene = getSceneFromKeywords(keywords);

  // 艺术效果
  const effects = "景深，柔光效果，大气透视，细腻的色彩层次，光影渐变，温馨氛围";

  return `${scene}，${baseStyle}，${effects}，适合作为文字背景的纯净画面`;
}

/**
 * 从文字中提取关键词
 */
function extractKeywords(text: string): string[] {
  const keywords: string[] = [];

  // 情感相关
  if (/快乐|开心|喜悦|幸福|美好/.test(text)) keywords.push('positive');
  if (/平静|安宁|宁静|祥和/.test(text)) keywords.push('peaceful');
  if (/力量|坚强|勇敢|奋斗/.test(text)) keywords.push('strong');
  if (/梦想|希望|未来|憧憬/.test(text)) keywords.push('hopeful');
  if (/感恩|感谢|珍惜/.test(text)) keywords.push('grateful');

  // 自然元素
  if (/阳光|光明|晨光|日出/.test(text)) keywords.push('sunshine');
  if (/海|海洋|大海|波浪/.test(text)) keywords.push('ocean');
  if (/山|山峰|高山/.test(text)) keywords.push('mountain');
  if (/花|花朵|鲜花|花园/.test(text)) keywords.push('flower');
  if (/天空|云|云彩/.test(text)) keywords.push('sky');
  if (/森林|树|树林/.test(text)) keywords.push('forest');
  if (/星|星空|夜空/.test(text)) keywords.push('stars');

  return keywords;
}

/**
 * 根据关键词生成场景描述
 */
function getSceneFromKeywords(keywords: string[]): string {
  // 如果有特定的自然元素，优先使用
  if (keywords.includes('sunshine')) {
    return "清晨第一缕阳光洒在露珠上，温暖金色光芒，朦胧美感";
  }
  if (keywords.includes('ocean')) {
    return "宁静的海面，柔和的波浪，天空倒映，海天一色的唯美画面";
  }
  if (keywords.includes('mountain')) {
    return "远山层叠，云雾缭绕，晨光中的山峦剪影";
  }
  if (keywords.includes('flower')) {
    return "清新的花田，微风吹过，花瓣飘落，春日气息";
  }
  if (keywords.includes('sky')) {
    return "辽阔天空，柔和云彩，温暖色调的天际线";
  }
  if (keywords.includes('forest')) {
    return "晨间森林，阳光透过树叶的斑驳光影，神秘而温暖";
  }
  if (keywords.includes('stars')) {
    return "璀璨星空，银河流淌，深邃而梦幻的夜空";
  }

  // 根据情感选择场景
  if (keywords.includes('peaceful')) {
    return "平静湖面，倒映天空，水天一色，宁静祥和的意境";
  }
  if (keywords.includes('strong')) {
    return "雄伟壮丽的自然景观，充满力量感的构图，震撼人心";
  }
  if (keywords.includes('hopeful')) {
    return "日出时分，霞光满天，新的一天开始，充满希望";
  }
  if (keywords.includes('grateful')) {
    return "温暖的自然光线，治愈系画面，温馨感人的氛围";
  }

  // 默认场景（晨读主题）
  return "清晨的自然风光，柔和的晨光，宁静美好的氛围，治愈系画面";
}
