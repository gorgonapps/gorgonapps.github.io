# Project: Gorgon curated game files

Files in this directory are modified copies of original files available at [this link](https://cdn.projectgorgon.com/).
The original content of these files is Copyright 2023 Elder Game, LLC.

The modified files are made available to simplify JSON deserialization (original files require some customized filters to be deserialized properly.) They also contain fixes for several errors and typos.

## Common changes made in multiple files

+ When appropriate, root object keys are not prefixed, and only the key is preserved. For instance, `item_40112` becomes `40112`. With this change, files can be deserialized as dictionaries with `int` keys.
+ `{ }` and `[ ]` become `{}` and `[]` respectively.
+ Colors are normalized to the `RRGGBB` hex format (upper case). Ex: `red` becomes `FF0000`. When present, the alpha part is removed because it's always `FF`.
+ Some area names are normalized across files:

| Original Name    | Normalized Name |
|------------------|-----------------|
| Ilmari           | Desert1         |
| Kur              | KurMountains    |
| Kur Mountains    | KurMountains    |
| Khyrulek's Crypt | Tomb1           |
| Anagoge Island   | NewbieIsland    |
| Serbule Caves    | SerbuleCaves    |
| Serbule Hills    | Serbule2        |
| Ilmari Desert    | Desert1         |
| Sun Vale         | SunVale         |
| Hogan's Keep     | Cave1           |
| Gazluk Dungeons  | GazlukCaves     |
| Gazluk Plateau   | Gazluk          |
| Wolf Cave        | Cave2           |
| Myconian Caverns | MyconianCave    |
| Gazluk Keep      | GazlukKeep      |
| Ranalon Den      | RanalonDen      |
| Red Wing Casino  | Casino          |
| Rahu Caves       | RahuCaves       |
| Rahu Sewer       | RahuSewer       |
| Rahu Sewers      | RahuSewers      |
| Fae Realm        | FaeRealm        |
| Sacred Grotto    | SacredGrotto    |
| A New Life       | ANewLife        |
| WNS Wintertide   | WNSWintertide   |

## abilities.json

+ `SpecialCasterRequirements` is always an array, even if it contains only one object.
+ Removed `"Projectile": "0"` assuming it means "None" (this is found in bash-type abilities).
+ Converted `SelfParticle`, `SelfPreParticle` and `TargetParticle` to a new `AbilityParticle` object. Ex:
```
"SelfPreParticle": "ChannelHealPre(AoeRange=20;AoeColor=#00FF00)",
"TargetParticle": "PsiWave(Color=#FFC000,#FFC080)"
```
becomes
```
"SelfPreParticle": {
	"AoEColor": "00FF00",
	"AoERange": 20,
	"ParticleName": "ChannelHealPre"
},
"TargetParticle": {
	"ParticleName": "PsiWave",
	"PrimaryColor": "FFC000",
	"SecondaryColor": "FFC080"
}
```
+ In the `ParticleName` field of the `AbilityParticle` object, `Wolf-SeeRed` is replaced by `WolfSeeRed`.
+ The `TargetTypeTagReq` field becomes `TargetTypeTagRequirement` and its content starting with `AnatomyType_` now starts with `Anatomy_` (to match skill names). Ex:
```
"TargetTypeTagReq": "AnatomyType_Arthropods"
```
becomes
```
"TargetTypeTagRequirement": "Anatomy_Arthropods"
```
+ `InventoryKeywordReqErrorMessage`, `InventoryKeywordReqs`, `ItemKeywordReqErrorMessage`, `PetTypeTagReq`, `PetTypeTagReqMax`, `SpecialTargetingTypeReq` and `TargetEffectKeywordReq` are renamed to `InventoryKeywordRequirementErrorMessage`, `ItemKeywordRequirementErrorMessage`, `InventoryKeywordRequirements`, `PetTypeTagRequirement`, `PetTypeTagRequirementMax`, `SpecialTargetingTypeRequirement` and `TargetEffectKeywordRequirement` respectively.
+ `ItemKeywordReqs` is renamed to `ItemKeywordRequirements` and split in two fields: `FormRequirement` if the original field contains a `form:` keyword, and other keywords remain in `ItemKeywordRequirements`. Ex:
```
"ItemKeywordReqs": [
	"EmptyHand",
	"form:Deer"
],
```
becomes
```
"FormRequirement": "Deer",
"ItemKeywordRequirements": [
	"EmptyHand"
]
```
+ `InternalAbility` is renamed to `IsInternalAbility`.
+ `AoEIsCenteredOnCaster` is renamed to `IsAoECenteredOnCaster`.
+ `Rank` becomes an integer field.
+ A new field is added: `DigitStrippedName`. This field is the `InternalName` field, stripped of digits and with a whitespace before upper-case letters. The following names are also changed to better match category names:

| `InternalName`     | `DigitStrippedName` |
|--------------------|---------------------|
| `StabledPetLiving` | `Stabled Pet`       |
| `TameRat`          | `Tame Animal`       |
| `TameCat`          | `Tame Animal`       |
| `TameBear`         | `Tame Animal`       |
| `TameBee`          | `Tame Animal`       |
| `BasicShotB`       | `Basic Shot`        |
| `AimedShotB`       | `Aimed Shot`        |
| `BlitzShotB`       | `Blitz Shot`        |
| `ToxinBombB`       | `Mycotoxin Formula` |
| `ToxinBombC`       | `Acid Bomb`         |
| `FireWallB`        | `Fire Wall`         |
| `IceVeinsB`        | `Ice Veins`         |
| `SliceB`           | `Duelists Slash`    |
| `WerewolfPounceB`  | `Pouncing Rend`     |
| `WerewolfPounceBB` | `Pouncing Rend`     |
+ `SelfPreEffects` in `PvE` is converted to an array of new `SelfPreEffect` objects. Ex:
```
"SelfPreEffects": [
	"MambaStrikeLowArmorDmgMod"
],
"SelfPreEffects": [
	"EnhanceZombie(SuperZombie1)"
],
"SelfPreEffects": [
	"ConfigGalvanize(,50)"
]
```
becomes
```
"SelfPreEffects": [
	{
		"Name": "MambaStrikeLowArmorDmgMod"
	}
],
"SelfPreEffects": [
	{
		"Enhancement": "SuperZombie1",
		"Name": "EnhanceZombie"
	}
],
"SelfPreEffects": [
	{
		"Name": "ConfigGalvanize",
		"Value": 50
	}
]
```
+ In the `Sword Slash` ability the `Lint_NotLearnable` keyword is removed.

## advancementtables.json

+ The creature name is a separate `Name` field.
+ The file is restructured so that `Levels` are collections of object with a `Level` field.
+ Each level is a collection of attributes names and values.
+ Levels are sorted.

Before:
```
"1001_Skeleton": {
	"Level_01": {
		"VULN_CRUSHING": 0.25,
		"VULN_DARKNESS": -0.5,
		"VULN_FIRE": 0.25,
		"VULN_NATURE": 0.25,
		"VULN_POISON": -0.5,
		"VULN_TRAUMA": -0.5
	}
}
```

After:
```
"1001": {
	"Levels": [
		{
			"Attributes": [
				{
					"Attribute": "VULN_CRUSHING",
					"Value": 0.25
				},
				{
					"Attribute": "VULN_DARKNESS",
					"Value": -0.5
				},
				{
					"Attribute": "VULN_FIRE",
					"Value": 0.25
				},
				{
					"Attribute": "VULN_NATURE",
					"Value": 0.25
				},
				{
					"Attribute": "VULN_POISON",
					"Value": -0.5
				},
				{
					"Attribute": "VULN_TRAUMA",
					"Value": -0.5
				}
			],
			"Level": 1
		}
	],
	"Name": "Skeleton"
}
```

## ai.json

+ Field names begin with an upper case letter. Ex: `cue` becomes `Cue`.
+ `MinDistance` and `MinRange` are consolidated to just be `MinRange` (they don't seem to be set separately).

## areas.json

No change.

## attributes.json

+ A bunch of attributes have been added so they can be linked to by other objects. All have `DisplayRule` set to `Never` and `DisplayType` set to `AsBuffDelta`. Here is a (possibly not up-to-date) list:
    - `COCKATRICEDEBUFF_COST_DELTA`
    - `LAMIADEBUFF_COST_DELTA`
    - `MONSTER_MATCH_OWNER_SPEED`
    - `ARMOR_MITIGATION_RATIO`
    - `SHOW_CLEANLINESS_INDICATORS`
    - `SHOW_COMMUNITY_INDICATORS`
    - `SHOW_PEACEABLENESS_INDICATORS`
    - `SHOW_FAIRYENERGY_INDICATORS`
    - `BOOST_ANIMALPETHEAL_SENDER`
    - `MONSTER_COMBAT_XP_VALUE`
    - `MOD_VAULT_SIZE`
    - `MENTAL_DEFENSE_RATING`

## directedgoals.json

+ The collection of objects becomes a dictionary, indexed by the value of `ID`. Ex:
```
{
	"Id": 1,
	"IsCategoryGate": true,
	"Label": "General",
	"LargeHint": "",
	"SmallHint": "",
	"Zone": "Tasks without a specific location"
}
```
becomes
```
"1": {
	"IsCategoryGate": true,
	"Label": "General",
	"LargeHint": "",
	"SmallHint": "",
	"Zone": "Tasks without a specific location"
}
```

## effects.json

+ `Duration` is always an integer (and not sometime a string).
+ `Desc` is renamed to `Description`.
+ Converted `Particle` to a new `EffectParticle` object. Ex:
```
"Particle": "ShadowFeintOrigin(AoeRange=20;AoeColor=#FFFFFF)"
```
becomes
```
"Particle": {
	"AoEColor": "FFFFFF",
	"AoERange": 20,
	"ParticleName": "ShadowFeintOrigin"
}
```
+ In the new `EffectParticle` field `OnFire-Green` is changed to `OnFireGreen`.
+ In `StackingType`, `Lamia's Gaze` and `1` are changed to `LamiasGaze` and `One` respectively.
+ In `effect_56043001` description `Restores 4 Armor` is changed to `Restores 4 Power` (this is a bug fix).

## items.json

+ `FoodDesc`, `IsSkillReqsDefaults`, `NumUses` and `SkillReqs` are renamed to `FoodDescription`, `IsSkillRequirementsDefaults`, `NumberOfUses` and `SkillRequirements` respectively.
+ `DroppedAppearance` is converted to an object with fields like `Skin`, `Cork`, etc. The `^` prefix is removed, both in field names and values. Also any hyphen in appearances is replaced with an underscore. Ex:
```
"DroppedAppearance": "LootPotion1(Color=red)",
"DroppedAppearance": "AlchemyBulb5(^Skin=AlchemyBulbs;^Cork=AlchemyBulbs)",
"DroppedAppearance": "CookedBrownBreadPlate(^Food=GF-Food;^Plate=GF-Dishes)",
"DroppedAppearance": "Peach(Skin=^Medieval-Fruits;Skin_Color=FF8E00)"
```
become
```
"DroppedAppearance": {
	"Appearance": "LootPotion1",
	"Color": "FF0000"
},
"DroppedAppearance": {
	"Appearance": "AlchemyBulb5",
	"Cork": "AlchemyBulbs",
	"Skin": "AlchemyBulbs"
},
"DroppedAppearance": {
	"Appearance": "CookedBrownBreadPlate",
	"Food": "GF-Food",
	"Plate": "GF-Dishes"
},
"DroppedAppearance": {
	"Appearance": "Peach",
	"Skin": "Medieval-Fruits",
	"SkinColor": "FF8E00"
}
```
+ `EffectDescs` is renamed to `EffectDescriptions` and is converted to an object. For a simple description only the `Description` field is filled, otherwise the `AttributeName` and `AttributeEffect` are filled with the attribute name and value effect respectively. Ex:
```
"EffectDescs": [
	"Death by iocaine poison"
],
"EffectDescs": [
	"{MAX_ARMOR}{6}",
	"{COMBAT_REFRESH_HEALTH_DELTA}{3}",
	"{COMBAT_REFRESH_ARMOR_DELTA}{3}",
	"{COMBAT_REFRESH_POWER_DELTA}{1}"
]
```
become
```
"EffectDescriptions": [
	{
		"Description": "Death by iocaine poison"
	}
],
"EffectDescriptions": [
	{
		"AttributeEffect": 6,
		"AttributeName": "MAX_ARMOR"
	},
	{
		"AttributeEffect": 3,
		"AttributeName": "COMBAT_REFRESH_HEALTH_DELTA"
	},
	{
		"AttributeEffect": 3,
		"AttributeName": "COMBAT_REFRESH_ARMOR_DELTA"
	},
	{
		"AttributeEffect": 1,
		"AttributeName": "COMBAT_REFRESH_POWER_DELTA"
	}
]
```
+ `Keywords` is converted to an array of objects. The `Keyword` field contains the keyword name, and `Values` the various values that can be listed for this keyword. Note that the order in which keywords and values are listed may not be preserved. For example:
```
"Keywords": [
	"Drink=40",
	"Edible",
	"EggDish=30",
	"Food",
	"PreparedFood=25",
	"PreparedFood=30",
	"Snack",
	"Snack=40"
]
```
becomes
```
"Keywords": [
	{
		"Keyword": "Drink",
		"Values": [
			40
		]
	},
	{
		"Keyword": "Edible"
	},
	{
		"Keyword": "EggDish",
		"Values": [
			30
		]
	},
	{
		"Keyword": "Food"
	},
	{
		"Keyword": "PreparedFood",
		"Values": [
			25,
			30
		]
	},
	{
		"Keyword": "Snack",
		"Values": [
			40
		]
	}
]
```
+ `StockDye` is converted to an object (and is removed if empty). Ex:
```
"StockDye": "",
"StockDye": ";Color1=007777;Color2=0077cc;Color3=cyan",
"StockDye": ";Color1=FFD872FF;Color2=383223FF;Color3=B0B57DFF",
"StockDye": ";Color1=333333;Color2=0056ff;Color3=FFFFFF;GlowEnabled=y"
```
become
```
"StockDye": {
	"Color1": "007777",
	"Color2": "0077CC",
	"Color3": "00FFFF",
	"IsGlowEnabled": false
},
"StockDye": {
	"Color1": "FFD872",
	"Color2": "383223",
	"Color3": "B0B57D",
	"IsGlowEnabled": false
},
"StockDye": {
	"Color1": "333333",
	"Color2": "0056FF",
	"Color3": "FFFFFF",
	"IsGlowEnabled": true
}
```

## itemuses.json

No change.

## lorebookinfo.json

+ Fields are sorted by alphabetical order. Ex: `SortTitle` comes before `Title`.

## lorebooks.json

No change.

## npcs.json

+ Fields are sorted by alphabetical order. Ex: `Name` comes before `Preferences`.
+ Fields are also sorted in NPC preferences: `Desire` comes before `Keywords`.
+ The file is formatted in the same pretty format as others.
+ In `AreaName` the `Area` prefix is removed (to match with area names).
+ In NPC preferences, the `Keywords` field is converted to new fields. Ex:
```
"Keywords":["MinValue:1000"],
"Keywords":["EquipmentSlot:Head","SkillPrereq:Hammer","Loot"],
"Keywords":["Knife","Loot","MinRarity:Uncommon"],
"Keywords":["Rarity:Common","Equipment"]
```
become
```
{
	"MinValueRequirement": 1000,
},
{
	"ItemKeywords": [
		"Loot"
	],
	"SlotRequirement": "Head",
	"SkillRequirement": "Hammer"
},
{
	"ItemKeywords": [
		"Knife",
		"Loot"
	],
	"MinRarityRequirement": "Uncommon"
},
{
	"ItemKeywords": [
		"Equipment"
	],
	"RarityRequirement": "Common"
},
```
+ In NPC preferences, `"Favor": "Error"` is just removed.
+ In NPC preferences, `Pref` is renamed to `PreferenceMultiplier`.
+ In the NPC preferences `Keywords` field, `Crafted:y` is changed to `CraftedYes`.
+ NPC preferences are sorted by desire, from love to hate.

## playertitles.json

+ If a title is colored, the color is saved in the `Color` field. Ex:
```
"Title_1": {
	"Title": "<color=cyan>Game Admin</color>"
},
```
become
```
"1": {
	"Color": "00FFFF",
	"Title": "Game Admin"
},
```

## quests.json

+ The `Reward_Favor` and `Rewards_Favor` fields are converted to a favor reward. Ex:
```
"Reward_Favor": 50,
"Rewards_Favor": 100
```
becomes
```
"Rewards": [
	{
		"Favor": 50,
		"T": "Favor"
	}
],
"Rewards": [
	{
		"Favor": 100,
		"T": "Favor"
	}
]
```
+ The `Rewards_NamedLootProfile` field is converted to a reward as well. Ex:
```
"Rewards_NamedLootProfile": "Custom_HelpTheHiveQuest"
```
becomes
```
"Rewards": [
	{
		"NamedLootProfile": "Custom_HelpTheHiveQuest",
		"T": "NamedLootProfile"
	}
]
```
+ The `Rewards_Items` field is converted to an array of rewards. Ex:
```
"Rewards_Items": [
	{
		"Item": "DiscoverWordOfPower1",
		"StackSize": 1
	},
	{
		"Item": "Potato",
		"StackSize": 5
	}
]
```
becomes
```
"Rewards": [
	{
		"Item": "Potato",
		"StackSize": 5,
		"T": "Item"
	},
	{
		"Item": "DiscoverWordOfPower1",
		"StackSize": 1,
		"T": "Item"
	}
]
```
+ The `Rewards_Effects` field is also converted, in a more complicated way. Each effect is converted to a reward, as follow.
  - `SetInteractionFlag` becomes the `"T": "InteractionFlag"` reward with an `InteractionFlag` field.
  - `EnsureLoreBookKnown` becomes the `"T": "LoreBook"` reward with a `LoreBook` field.
  - `BestowTitle` becomes the `"T": "Title"` reward with a `Title` field and each title identifier is converted to their id (the JSON files don't contain the identifier, making the association difficult).
  - `BestowRecipe` becomes the `"T": "Recipe"` reward with a `Recipe` field.
  - `LearnAbility` becomes the `"T": "Ability"` reward with an `Ability` field.
  - `AdvanceScriptedQuestObjective` becomes the `"T": "ScriptedQuestObjective"` reward with a `Npc` field, and the `_Complete` or `_Done` suffix is removed (to match NPC names).
  - `GiveXP` becomes the `"T": "SkillXp"` reward with the `Skill` and `Xp` fields.
  - `DeltaNpcFavor` becomes the `"T": "Favor"` reward with the `Npc` and `Favor` fields.
  - `RaiseSkillToLevel` becomes the `"T": "SkillLevel"` reward with the `Skill` and `Level` fields.
  - `DispelFaeBombSporeBuff` becomes the `"T": "DispelFaeBombSporeBuff"` reward.
  - Finally, other effects are converted to the `"T": "Effect"` reward with an `Effect` field.
+ Similarily, the `PreGiveEffects` field is converted to an array of effects, as follow.
  - `DeleteWarCacheMapFog` becomes the `"T": "Effect"` effect with a `Description` field.
  - `DeleteWarCacheMapPins` becomes the `"T": "Effect"` effect with a `Description` field.
  - `CreateIlmariWarCacheMap` becomes the `"T": "Item"` effect with the `Item` and `QuestGroup` fields.
  - `SetInteractionFlag` becomes the `"T": "SetInteractionFlag"` effect with an `InteractionFlag` field.
  - `ClearInteractionFlag` becomes the `"T": "ClearInteractionFlag"` effect with an `InteractionFlag` field.
  - `LearnAbility` becomes the `"T": "Ability"` effect with an `Ability` field.
+ `Requirements` is always an array, even if it contains only one object. Or a nested array of objects. Or a mix of object and array.
+ If `Requirements` contains an `AreaEvent`, the event is splitted as follow:
  - For `Daytime`, `AreaEvent` is removed and a new field, `Daytime`, is set to true.
  - For `PovusNightlyQuest`, `AreaEvent` is removed and a new field, `EventQuest`, is set to `PovusNightly`.
  - For other events, if `AreaEvent` is made of 3 or 4 parts then the last part is saved in a new field, `AreaName`, the last before last part is saved in the `EventQuest` field, the optional middle part is saved in the `EventSkill` field and the remaining text is kept in `AreaEvent`.
For example
```
{
	"AreaEvent": "Daytime",
	"T": "AreaEventOff"
},
{
	"AreaEvent": "PovusNightlyQuest",
	"T": "AreaEventOff"
},
{
	"AreaEvent": "Dee_Warden_GnasherInvasion_Eltibule",
	"T": "AreaEventOn"
}
```
become
```
{
	"Daytime": true,
	"T": "AreaEventOff"
},
{
	"EventQuest": "PovusNightly",
	"T": "AreaEventOff"
},
{
	"AreaEvent": "Dee",
	"AreaName": "Eltibule",
	"EventQuest": "GnasherInvasion",
	"EventSkill": "Warden",
	"T": "AreaEventOn"
}
```
+ In `Requirements`
  - `Level` is renamed to `FavorLevel` if it's a favor level.
  - `ErrorMsg` is renamed to `ErrorMessage`.
  - If `Rule` is `ChristmasQuests` this is changed to `During Christmas Quests`.
+ `RequirementsToSustain` is always an array, even if it contains only one object.
+ `Requirements` **in objectives** is always an array, even if it contains only one object.
+ For any objective of type `Kill`, if `AbilityKeyword` is set this is converted in a new requirement of type `UseAbility`. Ex:
```
"Objectives": [
	{
		"AbilityKeyword": "Kick",
		"Description": "Kick Pigs To Death",
		"Number": 12,
		"Target": "Pig",
		"Type": "Kill"
	}
]
```
becomes
```
"Objectives": [
	{
		"Description": "Kick Pigs To Death",
		"Number": 12,
		"Requirements": [
			{
				"AbilityKeyword": "Kick",
				"T": "UseAbility"
			}
		],
		"Target": "Pig",
		"Type": "Kill"
	}
]
```
+ For any objective for which the target area is provided in the `Target` field, this is converted in a new requirement of type `AreaEventOff`. Ex:
```
"Objectives": [
	{
		"Description": "Kill Ratkin in Povus",
		"Number": 15,
		"Target": [
			"Ratkin",
			"Area:AreaPovus"
		],
		"Type": "Kill"
	}
]
```
becomes
```
"Objectives": [
	{
		"Description": "Kill Ratkin in Povus",
		"Number": 15,
		"Requirements": [
			{
				"AreaName": "Povus",
				"T": "AreaEventOff"
			}
		],
		"Target": "Ratkin",
		"Type": "Kill"
	}
]
```
+ As a consequence of the preceding change, the `Target` field in objectives is no longer an array of string but just one string.
+ `NumExpectedParticipants` is renamed to `NumberOfExpectedParticipants`.
+ `NumToDeliver` in objectives is renamed to `NumberToDeliver` and changed to be an integer.
+ `ReuseTime_Days`, `ReuseTime_Hours` and `ReuseTime_Minutes` are merged into a single object. Ex:
```
"ReuseTime_Minutes": 180
```
becomes
```
"ReuseTime": {
	"Minutes": 180
}
```

## recipes.json

+ `OtherRequirements` is always an array, even if it contains only one object.
+ Converted `LoopParticle` and `Particle` to a new `RecipeParticle` object. Ex:
```
"Particle": "TeleportFlash(Color=#6D00FF,#BE8DFF;LightColor=#BE8DFF)"
```
becomes
```
"Particle": {
	"LightColor": "BE8DFF",
	"ParticleName": "TeleportFlash",
	"PrimaryColor": "6D00FF",
	"SecondaryColor": "BE8DFF"
}
```
+ `IsItemMenuKeywordReqSufficient`, `NumResultItems` and `SkillLevelReq` are renamed to `IsItemMenuKeywordRequirementSufficient`, `NumberOfResultItems` and `SkillLevelRequirement` respectively.
+ `ResultItems` is removed if it's an empty array.
+ In recipe ingredients and resulting items
  - `Desc` is renamed to `Description`.
  - In `ItemKeys` any colon is replaced with an underscore, and the first exclamation mark is replaced with `Not`.
+ `ResultEffect` is converted to an object. Some effects are converted by filling additional parameters. See examples below:
```
"WhittlingKnifeBuff1",
"CraftingEnhanceItemPockets(2,12)",
"PolymorphRabbitPermanentBlue",
"ExtractTSysPower(MainHandAugment,WeaponAugmentBrewing,0,30)",
"RepairItemDurability(0.3,0.6,94,0,30)",
"TSysCraftedEquipment(CraftedClothPants3C)",
"CraftSimpleTSysItem(Horseshoes4)",
"AddItemTSysPower(ShamanicHeadArmor,1)",
"AddItemTSysPowerWax(WaxArmor,4,1250)",
"BrewItem(2,15,BrewingFruitA4+BrewingMushroomA4=Partying4+SkillSpecificPowerCosts12)",
"AdjustRecipeReuseTime(-23400,WaxingCrescentMoon)",
"GiveTSysItem(ArachnidHarness3)",
"ConsumeItemUses(DrinkableRumBarrel,2)",
"DeltaCurFairyEnergy(-10)",
"Teleport(AreaSerbule, Landing_Boat)",
"CreateMiningSurvey8Y(MiningSurveyPovus8Y)",
"CreateGeologySurveyRedwall(GeologySurveySerbule0)",
"SpawnPremonition_All_2sec",
"PermanentlyRaiseMaxTempestEnergy(1)",
"CraftingResetItem",
"SendItemToSaddlebag",
"TransmogItemAppearance"
```
become
```
{
	"Keyword": "WhittlingKnifeBuff",
	"Tier": 1,
	"Type": "Tiered"
},
{
	"AddedQuantity": 2,
	"ConsumedEnhancementPoints": 12,
	"Enhancement": "Pockets",
	"Type": "CraftingEnhanceItem"
},
{
	"Color": "0000FF",
	"Type": "PolymorphRabbitPermanent"
},
{
	"Augment": "MainHandAugment",
	"MaxLevel": 30,
	"MinLevel": 0,
	"Skill": "WeaponAugmentBrewing",
	"Type": "ExtractTSysPower"
},
{
	"MaxLevel": 30,
	"MinLevel": 0,
	"RepairCooldown": {
		"Hours": 94
	},
	"RepairMaxEfficiency": 60,
	"RepairMinEfficiency": 30,
	"Type": "RepairItemDurability"
},
{
	"Boost": "CraftedClothPants",
	"BoostLevel": 3,
	"IsCamouflaged": true,
	"Type": "TSysCraftedEquipment"
},
{
	"Item": "Horseshoes4",
	"Type": "CraftSimpleTSysItem"
},
{
	"Slot": "ShamanicHeadArmor",
	"Tier": 1,
	"Type": "AddItemTSysPower"
},
{
	"MaxHitCount": 1250,
	"PowerLevel": 4,
	"PowerWaxType": "WaxArmor",
	"Type": "AddItemTSysPowerWax"
},
{
	"BrewLine": 2,
	"BrewParts": [
		"BrewingFruitA4",
		"BrewingMushroomA4"
	],
	"BrewResults": [
		"Partying4",
		"SkillSpecificPowerCosts12"
	],
	"BrewStrength": 15,
	"Type": "BrewItem"
},
{
	"AdjustedReuseTime": {
		"Hours": 6,
		"Minutes": 30
	},
	"MoonPhase": "WaxingCrescentMoon",
	"Type": "AdjustRecipeReuseTime"
},
{
	"Item": "ArachnidHarness3",
	"Type": "GiveTSysItem"
},
{
	"ConsumedUses": 2,
	"Keyword": "DrinkableRumBarrel",
	"Type": "ConsumeItemUses"
},
{
	"Delta": -10,
	"Type": "DeltaCurFairyEnergy"
},
{
	"AreaName": "Serbule",
	"Other": "Landing Boat",
	"Type": "Teleport"
},
{
	"Effect": "8Y",
	"Item": "MiningSurveyPovus8Y",
	"Type": "CreateMiningSurvey"
},
{
	"Effect": "Redwall",
	"Item": "GeologySurveySerbule0",
	"Type": "CreateGeologySurvey"
},
{
	"DurationInSeconds": 2,
	"Type": "SpawnPremonition"
},
{
	"Delta": 1,
	"Type": "PermanentlyRaiseMaxTempestEnergy"
},
{
	"Type": "CraftingResetItem"
},
{
	"Type": "SendItemToSaddlebag"
},
{
	"Type": "TransmogItemAppearance"
}
```
+ If `ItemMenuCategory` is `TSysExtract` or `TSysDistill` these values are renamed to `Extract` and `Distill` respectively.
+ Changed `ChanceToConsume`, `DurabilityConsumed` and `PercentChance` to integer percentages.
+ `ItemMenuKeywordReq` is renamed to `ItemMenuKeywordRequirement` and the value `MinRarity:Uncommon` is changed to `MinRarity_Uncommon`.

## skills.json

+ `Rewards` is restructured and becomes a collection of objects, with the key converted to the `Level` and `Races` fields. Ex:
```
"10_Human_Elf_Rakshasa_Fae_Dwarf": {
	"Ability": "BlitzShot2"
}
```
becomes
```
{
	"Ability": "BlitzShot2",
	"Level": 10,
	"Races": [
		"Human",
		"Elf",
		"Rakshasa",
		"Fae",
		"Dwarf"
	]
}
```
+ `AdvancementHints` is restructured and becomes a collection of objects, with the key converted to the `Level` field. Ex:
```
"AdvancementHints": {
	"50": "To earn more XP in Armor Augmentation, gain favor with Kohan or Ufkar in Rahu.",
	"60": "To earn more XP in Armor Augmentation, gain favor with Kohan or Ufkar in Rahu."
}
```
becomes
```
"AdvancementHints": [
	{
		"Hint": "To earn more XP in Armor Augmentation, gain favor with Kohan or Ufkar in Rahu.",
		"Level": 50,
		"Npcs": [
			"NPC_Kohan",
			"NPC_Ufkar"
		]
	},
	{
		"Hint": "To earn more XP in Armor Augmentation, gain favor with Kohan or Ufkar in Rahu.",
		"Level": 60,
		"Npcs": [
			"NPC_Kohan",
			"NPC_Ufkar"
		]
	}
],
```
+ `InteractionFlagLevelCaps` is restructured and becomes a collection of objects, with the key and value converted to fields. Performance skills are specified as such, with any `performance` prefix removed (though Dance is considered a performance skill).  Ex:
```
"LevelCap_AncillaryArmorAugmentBrewing_100": 90,
"LevelCap_Performance_Percussion20": 10
```
becomes
```
{
	"IsPerformanceSkill": false,
	"Level": 90,
	"Skill": "AncillaryArmorAugmentBrewing",
	"SkillCap": 100
},
{
	"IsPerformanceSkill": true,
	"Level": 10,
	"Skill": "Percussion",
	"SkillCap": 20
}
```
+ `Reports` is restructured and becomes a collection of objects, with the key converted to the `Level` and `Report` fields. Ex:
```
"Reports": {
	"1": "Get Binding Info",
	"2": "List Used Teleport Locations"
}
```
becomes
```
"Reports": [
	{
		"Level": 1,
		"Report": "Get Binding Info"
	},
	{
		"Level": 2,
		"Report": "List Used Teleport Locations"
	}
]
```
+ `Ability` **in rewards** is renamed to `Abilities` and is always an array, even if it contains only one object.
+ `RecipeIngredientKeywords` and `_RecipeIngredientKeywords` are unified as `RecipeIngredientKeywords`.
+ Removed `AdvancementTable` when set to `null`.
+ `AdvancementTable` is sorted in alphabetical order.

## sources_abilities.json and sources_recipes.json

+ Field names begin with an upper case letter. Ex: `entries` becomes `Entries`, `npc` becomes `Npc`.

## storagevaults.json

+ `Requirements` is always an array, even if it contains only one object (which is currently the case).
+ The `Area` field is renamed to `AreaName`, the `Area` prefix is removed and the whole `"Area": "*"` value is removed.
+ `NumSlots` is renamed to `NumberOfSlots`.

## tsysclientinfo.json

+ The file is restructured so that `Tiers` are collections of object with a `Tier` field (with the `id_` prefix removed), and tiers are sorted.

Before:
```
"Tiers": {
	"id_1": {
		"EffectDescs": [
			"{BOOST_SKILL_ARCHERY}{5}"
		],
		"MaxLevel": 30,
		"MinLevel": 10,
		"MinRarity": "Uncommon",
		"SkillLevelPrereq": 10
	},
	"id_10": {
		"EffectDescs": [
			"{MOD_SKILL_ARCHERY}{0.5}"
		],
		"MaxLevel": 120,
		"MinLevel": 100,
		"MinRarity": "Uncommon",
		"SkillLevelPrereq": 100
	},
	"id_2": {
		"EffectDescs": [
			"{MOD_SKILL_ARCHERY}{0.1}"
		],
		"MaxLevel": 40,
		"MinLevel": 20,
		"MinRarity": "Uncommon",
		"SkillLevelPrereq": 20
	},
```
After:
```
"Tiers": [
	{
		"EffectDescriptions": [
			{
				"AttributeEffect": 5,
				"AttributeName": "BOOST_SKILL_ARCHERY"
			}
		],
		"MaxLevel": 30,
		"MinLevel": 10,
		"MinRarity": "Uncommon",
		"SkillLevelPrerequirement": 10,
		"Tier": 1
	},
	{
		"EffectDescriptions": [
			{
				"AttributeEffect": 0.1,
				"AttributeName": "MOD_SKILL_ARCHERY"
			}
		],
		"MaxLevel": 40,
		"MinLevel": 20,
		"MinRarity": "Uncommon",
		"SkillLevelPrerequirement": 20,
		"Tier": 2
	},
    ...
```
+ `SkillLevelPrereq` is renamed to `SkillLevelPrerequirement`.
+ `EffectDescs` is renamed to `EffectDescriptions` and is converted to an object. For a simple description only the `Description` and `IconIds` fields are filled, otherwise the `AttributeName`, `AttributeEffect` and `AttributeSkill` are filled with the attribute name, value effect and applicable skill respectively. Ex:
```
"EffectDescs": [
	"<icon=3311><icon=3318>Multishot and Heavy Multishot Damage +16 and Power Cost -1"
],
"EffectDescs": [
	"{MAX_POWER}{10}{Archery}"
]
```
become
```
"EffectDescriptions": [
	{
		"Description": "Multishot and Heavy Multishot Damage +16 and Power Cost -1",
		"IconIds": [
			3311,
			3318
		]
	}
],
"EffectDescriptions": [
	{
		"AttributeEffect": 10,
		"AttributeName": "MAX_POWER",
		"AttributeSkill": "Archery"
	}
]
```
+ Some treasure effects are modified.
  - `power_24154` the icon with id 3553 is replaced with 3547 (this is a bug fix).
  - `power_20355` a extra attribute is added (this enables generic attribute parsing):
```
"EffectDescriptions": [
	{
		"AttributeEffect": <Varies>,
		"AttributeName": "BOOST_ABILITYDOT_TOUGHHOOF"
		"Description": "Tough Hoof deals <Varies> Trauma damage to the target each time they attack and damage you (within 8 seconds)",
		"IconIds": [
			2253
		]
	}
],
```
+ Some typo are fixed:
  - `Sic Em` is changed to `Sic 'Em`.
  - `anf` is changed to `and`.

## xptables.json

+ `Cooking-unused` is replaced with `CookingUnused`.
