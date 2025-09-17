import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronRight, ImageIcon, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PosterType {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  category: string;
}

const posterTypes: PosterType[] = [
  {
    id: "1",
    title: "New Limited Edition",
    imageUrl:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
    category: "Product Display",
  },
  {
    id: "2",
    title: "Up to 50% OFF",
    subtitle: "Shop Now",
    imageUrl:
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg",
    category: "Promotion",
  },
  {
    id: "3",
    title: "Editor's Choice",
    subtitle: "Barber Shop",
    imageUrl:
      "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg",
    category: "Branding",
  },
  {
    id: "4",
    title: "JOIN US AT OUR STUDIO",
    imageUrl:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    category: "Announcement",
  },
  {
    id: "5",
    title: "Bill",
    imageUrl:
      "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg",
    category: "Personal",
  },
];

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<"smart" | "advanced">("smart");
  const [selectedPoster, setSelectedPoster] = useState<string>("1");

  const [description, setDescription] = useState(
    "stunning promotional image of a deliciously decorated cake, emphasizing its layers, frosting, and toppings in an enticing setting."
  );
  const [descriptionImageUri, setDescriptionImageUri] = useState<string | null>(
    null
  );
  const [sizeValue, setSizeValue] = useState<string>("1080 x 1920 px");
  const [categoryValue, setCategoryValue] = useState<string>("Foods and beverage");
  const [showSizeDropdown, setShowSizeDropdown] = useState<boolean>(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);

  const [advDescription, setAdvDescription] = useState(
    "Advanced script: describe composition, color palette, camera angle and mood."
  );
  const [advImageUri, setAdvImageUri] = useState<string | null>(null);
  const [advSizeValue, setAdvSizeValue] = useState<string>("1080 x 1920 px");
  const [advCategoryValue, setAdvCategoryValue] = useState<string>(
    "All categories"
  );
  const [advColorPalette, setAdvColorPalette] = useState<string>(
    "Warm tones (orange, cream)"
  );
  const [advCameraAngle, setAdvCameraAngle] = useState<string>("45°");
  const [advMood, setAdvMood] = useState<string>("Bright, cheerful");
  const [showAdvSizeDropdown, setShowAdvSizeDropdown] = useState<boolean>(false);
  const [showAdvCategoryDropdown, setShowAdvCategoryDropdown] = useState<boolean>(false);

  const sizeOptions = [
    "1080 x 1920 px",
    "1080 x 1080 px",
    "720 x 1280 px",
    "640 x 480 px",
  ];
  const categoryOptions = [
    "Foods and beverage",
    "Fashion",
    "Travel",
    "Personal",
    "All categories",
  ];

  useEffect(() => {
    // request permissions for image picker on mount
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          // permission denied - in production show a message
        }
      }
    })();
  }, []);

  // pick image; target: 'smart' | 'advanced'
  async function pickImageAsync(target: "smart" | "advanced") {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        const anyRes: any = result;
        const uri =
          anyRes.assets && anyRes.assets[0] ? anyRes.assets[0].uri : anyRes.uri;
        if (!uri) return;
        if (target === "smart") setDescriptionImageUri(uri);
        else setAdvImageUri(uri);
      }
    } catch (e) {
      console.error("Image pick error", e);
    }
  }

  const renderPosterCard = (poster: PosterType, index: number) => (
    <TouchableOpacity
      key={poster.id}
      className={`w-[120px] h-[160px] rounded-xl mr-[15px] relative ${selectedPoster === poster.id ? "border-2 border-[#ffffff]" : ""}`}
      onPress={() => setSelectedPoster(poster.id)}
    >
      <Image
        source={{ uri: poster.imageUrl }}
        className="w-full h-full rounded-xl"
        style={{ resizeMode: "cover" }}
      />
      <View className="absolute left-[15px] right-[15px]" style={{ bottom: 15 }}>
        <Text className="text-base font-extrabold text-white" style={{ textShadowColor: "rgba(0,0,0,0.8)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 }}>
          {poster.title}
        </Text>
        {poster.subtitle && (
          <Text className="text-xs font-semibold text-white mt-1" style={{ textShadowColor: "rgba(0,0,0,0.8)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 }}>
            {poster.subtitle}
          </Text>
        )}
      </View>
      <View className="absolute" style={{ bottom: 5, right: 5 }}>
        <Text className="text-[10px] font-medium text-white opacity-80">
          {poster.category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // close dropdowns when pressing outside
  const closeDropdowns = () => {
    setShowSizeDropdown(false);
    setShowCategoryDropdown(false);
    setShowAdvSizeDropdown(false);
    setShowAdvCategoryDropdown(false);
  };

  // render the large content area using switch-case
  function renderContent() {
    switch (selectedTab) {
      case "smart":
        return (
          <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
            <Text className="text-2xl font-extrabold text-white mb-8">
              What type of posters do you want to create?
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-8"
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {posterTypes.map((poster, index) =>
                renderPosterCard(poster, index)
              )}
            </ScrollView>
            <View className="bg-[#2A2A2A] rounded-xl p-5 mb-8 relative min-h-[110px]">
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Type your description here..."
                placeholderTextColor="#666"
                multiline
                className="text-base text-white pr-10"
              />
              <TouchableOpacity
                onPress={() => pickImageAsync("smart")}
                className="absolute"
                style={{ bottom: 15, right: 15 }}
                activeOpacity={0.7}
              >
                {descriptionImageUri ? (
                  <Image
                    source={{ uri: descriptionImageUri }}
                    className="w-10 h-10 rounded"
                  />
                ) : (
                  <ImageIcon size={20} color="#fff" strokeWidth={1.5} />
                )}
              </TouchableOpacity>
            </View>
            <Text className="text-lg font-semibold text-white mb-4">
              Settings
            </Text>
            <View className="bg-[#2A2A2A] rounded-xl mb-8">
              <TouchableOpacity className="flex-row justify-between items-center px-5 py-4">
                <Text className="text-base font-medium text-white">
                  Size
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-base text-[#f0f0f0] mr-2">
                    {sizeValue}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowSizeDropdown((s) => !s);
                      setShowCategoryDropdown(false);
                    }}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <ChevronRight size={20} color="#f0f0f0" strokeWidth={1.5} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {showSizeDropdown && (
                <View className="bg-[#141414] mx-5 rounded overflow-hidden mb-2">
                  {sizeOptions.map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      onPress={() => {
                        setSizeValue(opt);
                        setShowSizeDropdown(false);
                      }}
                      className="py-3 px-4 border-b border-[#222]"
                    >
                      <Text className="text-white text-sm">{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <View className="h-px bg-[#404040] mx-5" />
              <TouchableOpacity className="flex-row justify-between items-center px-5 py-4">
                <Text className="text-base font-medium text-white">
                  Category
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-base text-[#f0f0f0] mr-2">
                    {categoryValue}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowCategoryDropdown((s) => !s);
                      setShowSizeDropdown(false);
                    }}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <ChevronRight size={20} color="#f0f0f0" strokeWidth={1.5} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {showCategoryDropdown && (
                <View className="bg-[#141414] mx-5 rounded overflow-hidden mb-2">
                  {categoryOptions.map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      onPress={() => {
                        setCategoryValue(opt);
                        setShowCategoryDropdown(false);
                      }}
                      className="py-3 px-4 border-b border-[#222]"
                    >
                      <Text className="text-white text-sm">{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        );
      case "advanced":
        return (
          <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
            <Text className="text-3xl font-bold text-white mb-8">
              Advanced editor
            </Text>
            <View className="h-[320px] rounded-xl overflow-hidden mb-4 bg-[#111] justify-center items-center">
              {advImageUri ? (
                <Image
                  source={{ uri: advImageUri }}
                  className="w-full h-full"
                  style={{ resizeMode: "cover" }}
                />
              ) : (
                <Text className="text-[#888]">Preview area (no image)</Text>
              )}
            </View>
            <View className="bg-[#2A2A2A] rounded-xl p-5 mb-8 relative min-h-[110px]">
              <TextInput
                value={advDescription}
                onChangeText={setAdvDescription}
                placeholder="Advanced description: composition, color, camera..."
                placeholderTextColor="#666"
                multiline
                className="text-base text-white pr-10"
              />
              <TouchableOpacity
                onPress={() => pickImageAsync("advanced")}
                className="absolute"
                style={{ bottom: 15, right: 15 }}
                activeOpacity={0.7}
              >
                {advImageUri ? (
                  <Image
                    source={{ uri: advImageUri }}
                    className="w-10 h-10 rounded"
                  />
                ) : (
                  <ImageIcon size={20} color="#fff" strokeWidth={1.5} />
                )}
              </TouchableOpacity>
            </View>
            <Text className="text-lg font-semibold text-white mb-4">
              Advanced Settings
            </Text>
            <View className="bg-[#2A2A2A] rounded-xl mb-8">
              <TouchableOpacity className="flex-row justify-between items-center px-5 py-4">
                <Text className="text-base font-medium text-white">
                  Size
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-base text-[#f0f0f0] mr-2">
                    {advSizeValue}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowAdvSizeDropdown((s) => !s);
                      setShowAdvCategoryDropdown(false);
                    }}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <ChevronRight size={20} color="#f0f0f0" strokeWidth={1.5} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {showAdvSizeDropdown && (
                <View className="bg-[#141414] mx-5 rounded overflow-hidden mb-2">
                  {sizeOptions.map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      onPress={() => {
                        setAdvSizeValue(opt);
                        setShowAdvSizeDropdown(false);
                      }}
                      className="py-3 px-4 border-b border-[#222]"
                    >
                      <Text className="text-white text-sm">{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <View className="h-px bg-[#404040] mx-5" />
              <TouchableOpacity className="flex-row justify-between items-center px-5 py-4">
                <Text className="text-base font-medium text-white">
                  Category
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-base text-[#f0f0f0] mr-2">
                    {advCategoryValue}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowAdvCategoryDropdown((s) => !s);
                      setShowAdvSizeDropdown(false);
                    }}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <ChevronRight size={20} color="#f0f0f0" strokeWidth={1.5} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {showAdvCategoryDropdown && (
                <View className="bg-[#141414] mx-5 rounded overflow-hidden mb-2">
                  {categoryOptions.map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      onPress={() => {
                        setAdvCategoryValue(opt);
                        setShowAdvCategoryDropdown(false);
                      }}
                      className="py-3 px-4 border-b border-[#222]"
                    >
                      <Text className="text-white text-sm">{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <View className="p-3 border-t border-[#222]">
                <Text className="text-[#9b9b9b] mb-1">Color palette</Text>
                <TextInput
                  value={advColorPalette}
                  onChangeText={setAdvColorPalette}
                  placeholder="e.g. Warm tones (orange, cream)"
                  placeholderTextColor="#666"
                  className="text-white py-1"
                />
                <Text className="text-[#9b9b9b] mt-3 mb-1">Camera angle</Text>
                <TextInput
                  value={advCameraAngle}
                  onChangeText={setAdvCameraAngle}
                  placeholder="e.g. 45°"
                  placeholderTextColor="#666"
                  className="text-white py-1"
                />
                <Text className="text-[#9b9b9b] mt-3 mb-1">Mood / Keywords</Text>
                <TextInput
                  value={advMood}
                  onChangeText={setAdvMood}
                  placeholder="e.g. Bright, cheerful"
                  placeholderTextColor="#666"
                  className="text-white py-1"
                />
              </View>
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={closeDropdowns}>
      <SafeAreaView className="flex-1 bg-black">
        <View className="pt-2 px-5">
          <TouchableOpacity className="self-start mb-8">
            <X size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <View className="flex-row justify-around mb-8">
            {[
              { key: "smart", label: "Smart script" },
              { key: "advanced", label: "Advanced script" },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                className="pb-4 relative items-center w-[160px]"
                onPress={() => setSelectedTab(tab.key as "smart" | "advanced")}
                activeOpacity={0.8}
              >
                <Text
                  className={`text-lg font-semibold ${selectedTab === tab.key ? "text-white" : "text-[#666666]"}`}
                >
                  {tab.label}
                </Text>
                {selectedTab === tab.key && (
                  <LinearGradient
                    colors={["#00D4FF", "#0066FF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="absolute h-[3px] rounded"
                    style={{
                      bottom: 0,
                      left: 0,
                      right: 0,
                    }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {renderContent()}
        <View className="px-5 pb-5">
          <TouchableOpacity className="bg-white rounded-xl py-4 flex-row items-center justify-center">
            <LinearGradient
              colors={["#0066FF", "#00D4FF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-5 h-5 rounded-full mr-3"
              style={{  borderRadius: 10, }}
            />
            <Text className="text-lg font-semibold text-black">
              Generate
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}